from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")  # Connect to local MongoDB

# Choose the database
db = client["fake_job_detection_db"]  # Use the database we created earlier

# Choose collections
jobs_collection = db["jobs"]  # Collection for storing job data
predictions_collection = db["predictions"]  # Collection for storing fake/real classification results

# Sample job data to insert
job_data = {
    "job_title": "Software Engineer",
    "company": "ABC Corp",
    "job_description": "Develop cutting-edge software solutions in a fast-paced environment.",
    "location": "Remote",
    "salary_range": "60,000 - 80,000 USD",
    "posted_date": "2026-01-19"
}

# Insert the job data into the 'jobs' collection
job_id = jobs_collection.insert_one(job_data).inserted_id

print(f"Inserted job with ID: {job_id}")
