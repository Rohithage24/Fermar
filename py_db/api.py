# main.py - Yield Prediction System
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split

class IntegratedAgriculturalSystem:
    def __init__(self):
        self.model = None
        self.crop_encoder = LabelEncoder()
        self.season_encoder = LabelEncoder()

    def generate_sample_data(self, n=1000):
        crops = ["Wheat", "Rice", "Maize"]
        seasons = ["Rabi", "Kharif", "Zaid"]

        df = pd.DataFrame({
            "crop_type": np.random.choice(crops, n),
            "season": np.random.choice(seasons, n),
            "soil_ph": np.random.uniform(5, 8, n),
            "nitrogen": np.random.uniform(20, 80, n),
            "phosphorus": np.random.uniform(10, 50, n),
            "potassium": np.random.uniform(10, 50, n),
            "organic_matter": np.random.uniform(1, 5, n),
            "electrical_conductivity": np.random.uniform(0.5, 2, n),
            "soil_moisture": np.random.uniform(20, 60, n),
            "temperature": np.random.uniform(15, 40, n),
            "rainfall": np.random.uniform(200, 1200, n),
            "humidity": np.random.uniform(40, 90, n),
            "irrigation_amount": np.random.uniform(50, 300, n),
        })

        df["yield"] = (
            df["soil_ph"] * 2
            + df["nitrogen"] * 0.5
            + df["phosphorus"] * 0.3
            + df["potassium"] * 0.4
            + df["soil_moisture"] * 0.7
            + np.random.normal(0, 10, n)
        )

        return df

    def train_yield_model(self, df):
        df["crop_type"] = self.crop_encoder.fit_transform(df["crop_type"])
        df["season"] = self.season_encoder.fit_transform(df["season"])

        X = df.drop(columns=["yield"])
        y = df["yield"]

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        self.model = LinearRegression()
        self.model.fit(X_train, y_train)

    def predict_yield(self, input_data: dict):
        input_data["crop_type"] = self.crop_encoder.transform([input_data["crop_type"]])[0]
        input_data["season"] = self.season_encoder.transform([input_data["season"]])[0]

        X_input = pd.DataFrame([input_data])
        return float(self.model.predict(X_input)[0])



# # api.py - AgroSanga API
# from fastapi import FastAPI, UploadFile, File, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel, Field
# import shutil
# import os
# from typing import Optional
# from soil import extract_soil_data_from_image
# from main import IntegratedAgriculturalSystem

# # Initialize FastAPI app
# app = FastAPI(title="🌾 AgroSanga API")

# # ✅ Allow all origins for deployment (or specify your frontend domain)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # change to ["https://your-frontend.onrender.com"] for production
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Initialize agricultural system and train model
# agri = IntegratedAgriculturalSystem()
# df = agri.generate_sample_data(1000)
# agri.train_yield_model(df)

# # Pydantic model for yield prediction input
# class PredictYieldInput(BaseModel):
#     crop_type: str = Field(..., description="Type of crop")
#     season: str = Field(..., description="Current season")
#     soil_ph: float = Field(..., gt=0, le=14)
#     nitrogen: float = Field(..., gt=0)
#     phosphorus: float = Field(..., gt=0)
#     potassium: float = Field(..., gt=0)
#     organic_matter: float = Field(..., ge=0)
#     electrical_conductivity: float = Field(..., ge=0)
#     soil_moisture: float = Field(..., ge=0, le=100)
#     temperature: float
#     rainfall: float = Field(..., ge=0)
#     humidity: float = Field(..., ge=0, le=100)
#     irrigation_amount: float = Field(..., ge=0)

# # Root endpoint
# @app.get("/")
# def root():
#     return {"message": "🌾 AgroSanga API is running on Render!"}

# # Upload soil image and extract data
# @app.post("/upload-soil/")
# async def upload_soil(file: UploadFile = File(...)):
#     try:
#         temp_path = f"temp_{file.filename}"
#         with open(temp_path, "wb") as buffer:
#             shutil.copyfileobj(file.file, buffer)
#         soil_data = extract_soil_data_from_image(temp_path)
#         os.remove(temp_path)

#         if not soil_data:
#             raise HTTPException(status_code=400, detail="Soil data could not be extracted.")

#         return {"soil_data": soil_data}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

# # Predict crop yield
# @app.post("/predict-yield/")
# async def predict_yield(input_data: PredictYieldInput):
#     try:
#         if input_data.crop_type not in agri.crop_encoder.classes_:
#             raise HTTPException(
#                 status_code=400,
#                 detail=f"Invalid crop type: '{input_data.crop_type}'. Valid: {list(agri.crop_encoder.classes_)}"
#             )
#         if input_data.season not in agri.season_encoder.classes_:
#             raise HTTPException(
#                 status_code=400,
#                 detail=f"Invalid season: '{input_data.season}'. Valid: {list(agri.season_encoder.classes_)}"
#             )

#         input_dict = input_data.dict()
#         predicted_yield = agri.predict_yield(input_dict)
#         return {"predicted_yield": predicted_yield, "unit": "kg/ha"}
#     except HTTPException:
#         raise
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
