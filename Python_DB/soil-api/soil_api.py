from fastapi import FastAPI, UploadFile, File, HTTPException
import shutil, os
from soil import extract_soil_data_from_image

app = FastAPI(title="🌱 Soil Report API")

@app.get("/")
def root():
    return {"message": "✅ Soil Report API running"}

@app.post("/soil-report/")
async def soil_report(file: UploadFile = File(...)):
    try:
        temp_path = f"temp_{file.filename}"
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        soil_data = extract_soil_data_from_image(temp_path)
        os.remove(temp_path)

        if not soil_data:
            raise HTTPException(status_code=400, detail="Soil data could not be extracted.")

        return {"soil_report": soil_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
