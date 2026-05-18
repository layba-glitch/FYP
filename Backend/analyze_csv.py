import pandas as pd
import numpy as np

# Read the CSV file
df = pd.read_csv('Models/dl/final_combined_dataset.csv')

# Basic info
print("Shape:", df.shape)
print("\nColumns:", list(df.columns))
print("\nData Types:")
print(df.dtypes)
print("\nFirst 5 rows:")
print(df.head())
print("\nDescribe:")
print(df.describe(include='all'))
print("\nNull values:")
print(df.isnull().sum())
print("\nUnique values in categorical columns:")
for col in df.select_dtypes(include=['object']).columns:
    print(f"{col}: {df[col].nunique()} unique values")
    if df[col].nunique() < 20:
        print(f"  Values: {df[col].unique()}")

# For is_fraud
print("\nIs_fraud distribution:")
print(df['is_fraud'].value_counts())