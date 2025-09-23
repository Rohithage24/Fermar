from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from main import IntegratedAgriculturalSystem

app = FastAPI(title="🌾 Crop Prediction API")

# Initialize system & train model once
agri = IntegratedAgriculturalSystem()
df = agri.generate_sample_data(1000)
agri.train_yield_model(df)

class PredictInput(BaseModel):
    crop_type: str
    season: str
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

@app.get("/")
def root():
    return {"message": "✅ Crop Prediction API running"}

@app.post("/predict-yield/")
async def predict_yield(input_data: PredictInput):
    try:
        if input_data.crop_type not in agri.crop_encoder.classes_:
            raise HTTPException(status_code=400, detail=f"Invalid crop: {input_data.crop_type}")
        if input_data.season not in agri.season_encoder.classes_:
            raise HTTPException(status_code=400, detail=f"Invalid season: {input_data.season}")

        predicted = agri.predict_yield(input_data.dict())
        return {"predicted_yield": predicted, "unit": "kg/ha"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
