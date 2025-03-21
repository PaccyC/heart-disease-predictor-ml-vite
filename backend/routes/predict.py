from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd

router = APIRouter()

try:
    # Load the trained model and scaler
    model = joblib.load("models/disease_model.pkl")
    scaler = joblib.load("models/scaler.pkl")
    
except Exception as e:
    raise RuntimeError(f"Error loading model: {str(e)}") 

# Define the DiseaseInput model with all 13 features
class DiseaseInput(BaseModel):
    age: float
    sex: int
    cp: int
    trestbps: float
    chol: float
    fbs: int
    restecg: int
    thalach: float
    exang: int
    oldpeak: float
    slope: int
    ca: int
    thal: int

@router.post("/predict")
def predict_disease(data: DiseaseInput):
    try:
        # Prepare the input data with correct column names
        input_data = pd.DataFrame({
            "age": [data.age],
            "sex": [data.sex],
            "cp": [data.cp],
            "trestbps": [data.trestbps],
            "chol": [data.chol],
            "fbs": [data.fbs],
            "restecg": [data.restecg],
            "thalach": [data.thalach],
            "exang": [data.exang],
            "oldpeak": [data.oldpeak],
            "slope": [data.slope],
            "ca": [data.ca],
            "thal": [data.thal]
        })

        # Scale the input data
        input_data_scaled = scaler.transform(input_data)

        # Make the prediction
        prediction = model.predict(input_data_scaled)
        probability = model.predict_proba(input_data_scaled)[0][1]

        return {
            "disease": bool(prediction),
            "probability": round(probability * 100, 2)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))