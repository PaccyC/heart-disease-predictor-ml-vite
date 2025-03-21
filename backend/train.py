import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import joblib
import kagglehub
import os

# Define dataset path
dataset_path = kagglehub.dataset_download("johnsmith88/heart-disease-dataset")


for file in os.listdir(dataset_path):
    if file.endswith(".csv"):
        csv_file_path = os.path.join(dataset_path, file)
        break

# Load dataset into pandas DataFrame
df = pd.read_csv(csv_file_path)

# Display the first few rows
print(df.head())

print(df.columns)
# Features and target
X = df.drop(columns=["target"])  # Input features
y = df["target"] 

# Data preprocessing
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save model & scaler
joblib.dump(model, "models/disease_model.pkl")
joblib.dump(scaler, "models/scaler.pkl")

print("✅ Model trained and saved successfully!")
