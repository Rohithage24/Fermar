# # main.py - Integrated Agricultural Recommendation System
# import pandas as pd
# import numpy as np
# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestRegressor
# from sklearn.preprocessing import StandardScaler, LabelEncoder
# from sklearn.metrics import mean_absolute_error, r2_score
# import warnings
# warnings.filterwarnings('ignore')

# # Optional soil OCR
# try:
#     from soil import extract_soil_data_from_image
#     SOIL_OCR_AVAILABLE = True
# except ImportError:
#     SOIL_OCR_AVAILABLE = False

# class IntegratedAgriculturalSystem:
#     def __init__(self):
#         self.yield_model = None
#         self.scaler = StandardScaler()
#         self.crop_encoder = LabelEncoder()
#         self.season_encoder = LabelEncoder()
#         self.feature_columns = []
#         self.crop_recommendations = self._load_crop_knowledge()

#     # Crop knowledge
#     def _load_crop_knowledge(self):
#         return {
#             'wheat': {'optimal_ph': (6.0, 7.5)},
#             'rice': {'optimal_ph': (5.5, 6.5)},
#             'maize': {'optimal_ph': (5.5, 7.5)},
#             'tomato': {'optimal_ph': (6.0, 6.8)},
#         }

#     # Generate sample data
#     def generate_sample_data(self, n=1000):
#         np.random.seed(42)
#         crop_types = np.random.choice(['wheat', 'rice', 'maize', 'tomato'], n)
#         seasons = np.random.choice(['spring', 'summer', 'fall', 'winter'], n)
#         df = pd.DataFrame({
#             'crop_type': crop_types,
#             'season': seasons,
#             'soil_ph': np.random.uniform(4.5, 8.5, n),
#             'nitrogen': np.random.uniform(50, 200, n),
#             'phosphorus': np.random.uniform(20, 100, n),
#             'potassium': np.random.uniform(50, 250, n),
#             'organic_matter': np.random.uniform(1.0, 5.0, n),
#             'electrical_conductivity': np.random.uniform(0.5, 3.0, n),
#             'soil_moisture': np.random.uniform(20, 80, n),
#             'temperature': np.random.uniform(10, 40, n),
#             'rainfall': np.random.uniform(100, 1500, n),
#             'humidity': np.random.uniform(30, 95, n),
#             'irrigation_amount': np.random.uniform(0, 500, n)
#         })

#         df['soil_fertility_index'] = (
#             (df['nitrogen']/150) * 0.4 +
#             (df['phosphorus']/70) * 0.3 +
#             (df['potassium']/200) * 0.3
#         )
#         df['moisture_stress_index'] = 1 - (np.abs(df['soil_moisture'] - 50) / 50)
#         df['ph_suitability_index'] = 1 - (np.abs(df['soil_ph'] - 6.5) / 2)

#         yield_kg_ha = (
#             5000 +
#             df['soil_fertility_index'] * 2000 +
#             df['moisture_stress_index'] * 1500 +
#             df['ph_suitability_index'] * 1000 +
#             (np.where(df['rainfall'] > 800, 1, 0)) * 500 +
#             (np.where(df['irrigation_amount'] > 250, 1, 0)) * 500 +
#             np.random.normal(0, 500, n)
#         )
#         df['yield_kg_ha'] = np.maximum(0, yield_kg_ha)
#         return df

#     # Train model
#     def train_yield_model(self, df):
#         df['crop_encoded'] = self.crop_encoder.fit_transform(df['crop_type'])
#         df['season_encoded'] = self.season_encoder.fit_transform(df['season'])
#         self.feature_columns = [
#             'crop_encoded', 'season_encoded', 'soil_ph', 'nitrogen', 'phosphorus', 'potassium',
#             'organic_matter', 'electrical_conductivity', 'soil_moisture',
#             'temperature', 'rainfall', 'humidity', 'irrigation_amount'
#         ]
#         X = self.scaler.fit_transform(df[self.feature_columns])
#         y = df['yield_kg_ha']
#         X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
#         self.yield_model = RandomForestRegressor(n_estimators=100, random_state=42)
#         self.yield_model.fit(X_train, y_train)
#         predictions = self.yield_model.predict(X_test)
#         mae = mean_absolute_error(y_test, predictions)
#         r2 = r2_score(y_test, predictions)
#         print(f"✅ Yield model trained. MAE: {mae:.2f}, R2: {r2:.2f}")

#     # Predict yield
#     def predict_yield(self, input_data):
#         df = pd.DataFrame([input_data])
#         df['crop_encoded'] = self.crop_encoder.transform(df['crop_type'])
#         df['season_encoded'] = self.season_encoder.transform(df['season'])
#         X = self.scaler.transform(df[self.feature_columns])
#         return max(0, self.yield_model.predict(X)[0])

# def main():
#     print("🌾 Integrated Agri System 🌾")
#     agri = IntegratedAgriculturalSystem()
#     df = agri.generate_sample_data(1000)
#     agri.train_yield_model(df)

# if __name__ == "__main__":
#     main()


# main.py - Integrated Agricultural Recommendation System
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import mean_absolute_error, r2_score
import warnings
warnings.filterwarnings('ignore')

# Optional OCR
try:
    from soil import extract_soil_data_from_image
    SOIL_OCR_AVAILABLE = True
except ImportError:
    SOIL_OCR_AVAILABLE = False

class IntegratedAgriculturalSystem:
    def __init__(self):
        self.yield_model = None
        self.scaler = StandardScaler()
        self.crop_encoder = LabelEncoder()
        self.season_encoder = LabelEncoder()
        self.feature_columns = []
        self.crop_recommendations = self._load_crop_knowledge()

    def _load_crop_knowledge(self):
        return {
            'wheat': {'optimal_ph': (6.0, 7.5)},
            'rice': {'optimal_ph': (5.5, 6.5)},
            'maize': {'optimal_ph': (5.5, 7.5)},
            'tomato': {'optimal_ph': (6.0, 6.8)},
        }

    def generate_sample_data(self, n=1000):
        np.random.seed(42)
        crop_types = np.random.choice(['wheat', 'rice', 'maize', 'tomato'], n)
        seasons = np.random.choice(['spring', 'summer', 'fall', 'winter'], n)
        df = pd.DataFrame({
            'crop_type': crop_types,
            'season': seasons,
            'soil_ph': np.random.uniform(4.5, 8.5, n),
            'nitrogen': np.random.uniform(50, 200, n),
            'phosphorus': np.random.uniform(20, 100, n),
            'potassium': np.random.uniform(50, 250, n),
            'organic_matter': np.random.uniform(1.0, 5.0, n),
            'electrical_conductivity': np.random.uniform(0.5, 3.0, n),
            'soil_moisture': np.random.uniform(20, 80, n),
            'temperature': np.random.uniform(10, 40, n),
            'rainfall': np.random.uniform(100, 1500, n),
            'humidity': np.random.uniform(30, 95, n),
            'irrigation_amount': np.random.uniform(0, 500, n)
        })

        df['soil_fertility_index'] = (
            (df['nitrogen']/150) * 0.4 +
            (df['phosphorus']/70) * 0.3 +
            (df['potassium']/200) * 0.3
        )
        df['moisture_stress_index'] = 1 - (np.abs(df['soil_moisture'] - 50) / 50)
        df['ph_suitability_index'] = 1 - (np.abs(df['soil_ph'] - 6.5) / 2)

        yield_kg_ha = (
            5000 +
            df['soil_fertility_index'] * 2000 +
            df['moisture_stress_index'] * 1500 +
            df['ph_suitability_index'] * 1000 +
            (np.where(df['rainfall'] > 800, 1, 0)) * 500 +
            (np.where(df['irrigation_amount'] > 250, 1, 0)) * 500 +
            np.random.normal(0, 500, n)
        )
        df['yield_kg_ha'] = np.maximum(0, yield_kg_ha)
        return df

    def train_yield_model(self, df):
        df['crop_encoded'] = self.crop_encoder.fit_transform(df['crop_type'])
        df['season_encoded'] = self.season_encoder.fit_transform(df['season'])
        self.feature_columns = [
            'crop_encoded', 'season_encoded', 'soil_ph', 'nitrogen', 'phosphorus', 'potassium',
            'organic_matter', 'electrical_conductivity', 'soil_moisture',
            'temperature', 'rainfall', 'humidity', 'irrigation_amount'
        ]
        X = self.scaler.fit_transform(df[self.feature_columns])
        y = df['yield_kg_ha']
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        self.yield_model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.yield_model.fit(X_train, y_train)
        predictions = self.yield_model.predict(X_test)
        mae = mean_absolute_error(y_test, predictions)
        r2 = r2_score(y_test, predictions)
        print(f"✅ Yield model trained. MAE: {mae:.2f}, R2: {r2:.2f}")

    def predict_yield(self, input_data):
        df = pd.DataFrame([input_data])
        df['crop_encoded'] = self.crop_encoder.transform(df['crop_type'])
        df['season_encoded'] = self.season_encoder.transform(df['season'])
        X = self.scaler.transform(df[self.feature_columns])
        return max(0, self.yield_model.predict(X)[0])

if __name__ == "__main__":
    agri = IntegratedAgriculturalSystem()
    df = agri.generate_sample_data(1000)
    agri.train_yield_model(df)
