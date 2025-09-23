# # soil.py - Soil OCR Module
# import os
# import re
# from typing import Optional, Dict

# try:
#     from doctr.io import DocumentFile
#     from doctr.models import ocr_predictor
#     DOCTR_AVAILABLE = True
# except ImportError:
#     DOCTR_AVAILABLE = False
#     print("⚠ DocTR not installed. Run: pip install python-doctr[torch]")

# def extract_soil_data_from_image(file_path: Optional[str] = None) -> Optional[Dict[str, float]]:
#     if not DOCTR_AVAILABLE:
#         print("❌ DocTR not available. Cannot perform OCR.")
#         return None
#     if not file_path or not os.path.exists(file_path):
#         print("❌ Invalid file path provided.")
#         return None
#     try:
#         doc = DocumentFile.from_images(file_path)
#         predictor = ocr_predictor(pretrained=True)
#         result = predictor(doc)
#         text = " ".join([w.value for p in result.pages for b in p.blocks for l in b.lines for w in l.words])

#         def find_val(pattern, default=None):
#             m = re.search(pattern, text, re.IGNORECASE)
#             return float(m.group(1)) if m else default

#         soil_data = {
#             'soil_ph': find_val(r"pH[:\s]*([0-9.]+)", default=6.5),
#             'nitrogen': find_val(r"Nitrogen\s*[:\s]*([0-9.]+)", default=100.0),
#             'phosphorus': find_val(r"Phosphorus\s*[:\s]*([0-9.]+)", default=50.0),
#             'potassium': find_val(r"Potassium\s*[:\s]*([0-9.]+)", default=150.0),
#             'organic_matter': find_val(r"Organic\s*Matter\s*[:\s]*([0-9.]+)", default=2.5),
#             'electrical_conductivity': find_val(r"Conductivity\s*[:\s]*([0-9.]+)", default=1.0),
#         }

#         if any(v is None for v in soil_data.values()):
#             print("❌ Some soil data values could not be extracted from the image.")
#             return None

#         return soil_data
#     except Exception as e:
#         print(f"❌ OCR error: {e}")
#         return None

# if __name__ == "__main__":
#     print("This module is intended to be imported by api.py.")


# soil.py - Soil OCR Module
import os
import re
from typing import Optional, Dict

try:
    from doctr.io import DocumentFile
    from doctr.models import ocr_predictor
    DOCTR_AVAILABLE = True
except ImportError:
    DOCTR_AVAILABLE = False
    print("⚠ DocTR not installed. Run: pip install python-doctr[torch]")

def extract_soil_data_from_image(file_path: Optional[str] = None) -> Optional[Dict[str, float]]:
    if not DOCTR_AVAILABLE:
        print("❌ DocTR not available. Cannot perform OCR.")
        return None
    if not file_path or not os.path.exists(file_path):
        print("❌ Invalid file path provided.")
        return None
    try:
        doc = DocumentFile.from_images(file_path)
        predictor = ocr_predictor(pretrained=True)
        result = predictor(doc)
        text = " ".join([w.value for p in result.pages for b in p.blocks for l in b.lines for w in l.words])

        def find_val(pattern, default=None):
            m = re.search(pattern, text, re.IGNORECASE)
            return float(m.group(1)) if m else default

        soil_data = {
            'soil_ph': find_val(r"pH[:\s]*([0-9.]+)", default=6.5),
            'nitrogen': find_val(r"Nitrogen\s*[:\s]*([0-9.]+)", default=100.0),
            'phosphorus': find_val(r"Phosphorus\s*[:\s]*([0-9.]+)", default=50.0),
            'potassium': find_val(r"Potassium\s*[:\s]*([0-9.]+)", default=150.0),
            'organic_matter': find_val(r"Organic\s*Matter\s*[:\s]*([0-9.]+)", default=2.5),
            'electrical_conductivity': find_val(r"Conductivity\s*[:\s]*([0-9.]+)", default=1.0),
        }

        if any(v is None for v in soil_data.values()):
            print("❌ Some soil data values could not be extracted from the image.")
            return None

        return soil_data
    except Exception as e:
        print(f"❌ OCR error: {e}")
        return None
