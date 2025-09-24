
# api.py - AgroSanga API
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import shutil
import os
from typing import Optional
from soil import extract_soil_data_from_image
from main import IntegratedAgriculturalSystem

# Initialize FastAPI app
app = FastAPI(title="🌾 AgroSanga API")

# CORS settings
origins = [
    "http://127.0.0.1:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize agricultural system and train model
agri = IntegratedAgriculturalSystem()
df = agri.generate_sample_data(1000)
agri.train_yield_model(df)

# Pydantic model for yield prediction input
class PredictYieldInput(BaseModel):
    crop_type: str = Field(..., description="Type of crop")
    season: str = Field(..., description="Current season")
    soil_ph: float = Field(..., gt=0, le=14)
    nitrogen: float = Field(..., gt=0)
    phosphorus: float = Field(..., gt=0)
    potassium: float = Field(..., gt=0)
    organic_matter: float = Field(..., ge=0)
    electrical_conductivity: float = Field(..., ge=0)
    soil_moisture: float = Field(..., ge=0, le=100)
    temperature: float
    rainfall: float = Field(..., ge=0)
    humidity: float = Field(..., ge=0, le=100)
    irrigation_amount: float = Field(..., ge=0)

# Root endpoint
@app.get("/")
def root():
    return {"message": "🌾 AgroSanga API is running"}

# Upload soil image and extract data
@app.post("/upload-soil/")
async def upload_soil(file: UploadFile = File(...)):
    try:
        temp_path = f"temp_{file.filename}"
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        soil_data = extract_soil_data_from_image(temp_path)
        os.remove(temp_path)

        if not soil_data:
            raise HTTPException(status_code=400, detail="Soil data could not be extracted.")

        return {"soil_data": soil_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

# Predict crop yield
@app.post("/predict-yield/")
async def predict_yield(input_data: PredictYieldInput):
    try:
        # Check valid crop & season
        if input_data.crop_type not in agri.crop_encoder.classes_:
            raise HTTPException(status_code=400, detail=f"Invalid crop type: {input_data.crop_type}")
        if input_data.season not in agri.season_encoder.classes_:
            raise HTTPException(status_code=400, detail=f"Invalid season: {input_data.season}")

        predicted_yield = agri.predict_yield(input_data.dict())
        return {"predicted_yield": float(predicted_yield), "unit": "kg/ha"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")



# @app.post("/predict-yield/")
# async def predict_yield(input_data: PredictYieldInput):
    try:
        if input_data.crop_type not in agri.crop_encoder.classes_:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid crop type: '{input_data.crop_type}'. Valid: {list(agri.crop_encoder.classes_)}"
            )
        if input_data.season not in agri.season_encoder.classes_:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid season: '{input_data.season}'. Valid: {list(agri.season_encoder.classes_)}"
            )

        input_dict = input_data.dict()
        predicted_yield = agri.predict_yield(input_dict)
        return {"predicted_yield": predicted_yield, "unit": "kg/ha"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
