

#  Fake Job Detection System (FYP)

**Advanced Hybrid Intelligence for Fraudulent Employment Mitigation**

###  Executive Summary

In an era of rising cyber-deception, job seekers are increasingly vulnerable to sophisticated fraudulent postings. This system provides a **high-precision, multi-layered defense mechanism** designed to identify and flag deceptive job listings before they compromise user security. By synthesizing statistical machine learning with deep learning linguistic analysis, this project sets a new standard for automated employment verification.

---

###  Architectural Intelligence

Our system utilizes a **Triple-Engine Inference Pipeline**:

* **Statistical Baseline (Logistic Regression):** A high-speed probabilistic layer using TF-IDF vectorization to detect patterns in lexical structure and geographic metadata.
* **Deep Semantic Analysis (Bi-LSTM):** A state-of-the-art Neural Network configured for sequential pattern recognition, uncovering hidden threats in descriptive text that statistical models miss.
* **Heuristic Override Engine:** A rule-based safety layer that applies penalty weights for suspicious linguistic indicators (e.g., "Urgent/ASAP" pressure tactics, lack of contact details).

---

###  Technical Stack

| Domain | Technology |
| --- | --- |
| **Backend** | Python, FastAPI, TensorFlow/Keras, Scikit-Learn |
| **Frontend** | Next.js, React, Tailwind CSS |
| **Database** | MongoDB (for real-time prediction history) |
| **Data Flow** | Asynchronous task management & RESTful API integration |

---

###  Key Performance Indicators

* **Latency:** Sub-second inference time via `asynccontextmanager` model loading.
* **Accuracy:** Weighted ensemble scoring that prioritizes ML reliability with DL precision.
* **Usability:** High-fidelity UI with real-time HUD (Heads-Up Display) for threat visualization.

---

###  Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/layba-glitch/FYP.git

# 2. Deploy Backend (FastAPI)
cd Backend
pip install -r requirements.txt
python app.py

# 3. Launch Frontend (Next.js)
cd ../Frontend/fake-job-detector-frontend
npm install
npm run dev

```

---

###  Ethical Disclosure

*This project was developed as a Final Year Project to advance digital security. It is intended for educational purposes and as a framework for future development in fraud mitigation.*


