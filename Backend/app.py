from __future__ import annotations
import os
import joblib
import numpy as np
import scipy.sparse as sp
from typing import Optional, Dict, Any
import datetime
from contextlib import asynccontextmanager
from dotenv import load_dotenv

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from pydantic import BaseModel, Field

import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences

# Load environment variables from .env
load_dotenv()

# ----------------------------
# Paths
# ----------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DL_DIR = os.path.join(BASE_DIR, "models", "dl")
ML_DIR = os.path.join(BASE_DIR, "models", "ml")

DL_MODEL_PATH = os.path.join(DL_DIR, "fake_job_model_v2.keras")
MAX_LEN_PATH = os.path.join(DL_DIR, "max_len.txt")
ML_MODEL_PATH = os.path.join(ML_DIR, "logistic_model.pkl")
TFIDF_PATH = os.path.join(ML_DIR, "tfidf_vectorizer.pkl")
COUNTRY_RATE_PATH = os.path.join(ML_DIR, "country_rate.pkl")
TOKENIZER_PATH = os.path.join(DL_DIR, "tokenizer_v2_lime.pkl")

# ----------------------------
# Database Connection
# ----------------------------
predictions_collection = None
try:
    MONGO_URI = os.getenv("MONGO_URI")
    client = MongoClient(MONGO_URI)
    db = client["fake_job_detection_db"]
    predictions_collection = db["predictions"]
    print("✅ Connected to MongoDB Atlas")
except Exception as e:
    print(f"❌ MongoDB Connection Failed: {e}")

# ----------------------------
# Global Variables
# ----------------------------
DL_MODEL = None
TOKENIZER = None
MAX_LEN = 150 
ML_MODEL = None
TFIDF = None
COUNTRY_RATE = None

# ----------------------------
# Loaders
# ----------------------------
def load_models():
    global DL_MODEL, TOKENIZER, MAX_LEN, ML_MODEL, TFIDF, COUNTRY_RATE
    print("⏳ Loading models and tokenizer...")
    DL_MODEL = tf.keras.models.load_model(DL_MODEL_PATH, compile=False)
    TOKENIZER = joblib.load(TOKENIZER_PATH) 
    ML_MODEL = joblib.load(ML_MODEL_PATH)
    TFIDF = joblib.load(TFIDF_PATH)
    COUNTRY_RATE = joblib.load(COUNTRY_RATE_PATH)
    print("✅ All systems ready!")

@asynccontextmanager
async def lifespan(app: FastAPI):
    load_models()
    yield

# ----------------------------
# App Init
# ----------------------------
app = FastAPI(title="Fake Job Detection API", version="1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------
# Schemas
# ----------------------------
class PredictRequest(BaseModel):
    title: Optional[str] = Field(default="")
    description: str
    requirements: Optional[str] = Field(default="")
    country: Optional[str] = Field(default=None)
    location: Optional[str] = Field(default=None)
    threshold: float

class PredictResponse(BaseModel):
    final_label: str
    final_confidence: float
    dl_prob_fake: float
    ml_prob_fake: float
    notes: Dict[str, Any]

# ----------------------------
# Prediction Logic
# ----------------------------
def predict_dl(description):
    test_text = [str(description)]
    seq = TOKENIZER.texts_to_sequences(test_text)
    pad = pad_sequences(seq, maxlen=150)
    prediction = DL_MODEL.predict(pad, verbose=0)
    return float(prediction[0][0])

def predict_ml(title, description, requirements, country):
    text = f"{title} {description} {requirements}".strip()
    X_text = TFIDF.transform([text])
    c_val = COUNTRY_RATE.get(country, 0.0) if country else 0.0
    X_final = sp.hstack([X_text, [[c_val]]], format="csr")
    return float(ML_MODEL.predict_proba(X_final)[:, 1][0])

# ----------------------------
# Route
# ----------------------------
@app.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest):
    if not req.description:
        raise HTTPException(status_code=400, detail="Description required")

    country = req.country
    if not country and req.location:
        parts = [p.strip() for p in req.location.split(",") if p.strip()]
        if parts:
            country = parts[0].upper() if len(parts[0]) <= 3 else parts[-1].upper()

    dl_prob = predict_dl(req.description)
    ml_prob = predict_ml(req.title, req.description, req.requirements, country)

    w_ml, w_dl = 0.8, 0.2
    combined_prob = (ml_prob * w_ml) + (dl_prob * w_dl)

    # 3. HEURISTIC OVERRIDE
    penalty = 0.0
    full_text = f"{req.description} {req.requirements}".lower()
    
    missing_contact = not any(word in full_text for word in ["contact", "email", "@", "call", "phone", "apply via", "website"])
    is_vague = any(word in full_text for word in ["urgent", "immediately", "asap"]) and len(req.description) < 300
    
    if missing_contact:
        penalty += 0.15
    if is_vague:
        penalty += 0.10
        
    combined_prob = min(1.0, combined_prob + penalty)

    # 4. Final Classification (Dynamically Tuned via Request Payload)
    is_fake = combined_prob >= req.threshold
    label = "FAKE" if is_fake else "REAL"
    confidence = combined_prob if is_fake else (1 - combined_prob)

    response_data = PredictResponse(
        final_label=label,
        final_confidence=float(confidence),
        dl_prob_fake=float(dl_prob),
        ml_prob_fake=float(ml_prob),
        notes={
            "country": country, 
            "ensemble": "Weighted Average + Heuristic Penalty",
            "penalty_applied": penalty > 0,
            "threshold": req.threshold
        }
    )

    if predictions_collection is not None:
        try:
            predictions_collection.insert_one({
                "timestamp": datetime.datetime.now(),
                "input": req.model_dump(),
                "output": response_data.model_dump()
            })
        except Exception as db_err:
            print(f"❌ Database Save Error: {db_err}")

    return response_data

@app.get("/history")
def get_history():
    if predictions_collection is None:
        return []
    cursor = predictions_collection.find().sort("timestamp", -1).limit(20)
    history = list(cursor)
    formatted_history = []
    for item in history:
        item["_id"] = str(item["_id"])
        raw_label = item["output"]["final_label"]
        ui_verdict = "likely_fake" if raw_label == "FAKE" else "likely_legit"
        formatted_history.append({
            "id": item["_id"],
            "title": item["input"].get("title") or "Untitled Position",
            "verdict": ui_verdict,
            "score": int(item["output"]["final_confidence"] * 100),
            "timestamp": item["timestamp"]
        })
    return formatted_history

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)