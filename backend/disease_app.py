import os
import torch
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import torchvision.transforms.functional as TF
import CNN  # This imports the CNN architecture we copied

app = Flask(__name__)
CORS(app)

# Paths and Config
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DISEASE_INFO_PATH = os.path.join(BASE_DIR, 'disease_info.csv')
SUPPLEMENT_INFO_PATH = os.path.join(BASE_DIR, 'supplement_info.csv')
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads')

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Load metadata
try:
    disease_info = pd.read_csv(DISEASE_INFO_PATH, encoding='cp1252')
    supplement_info = pd.read_csv(SUPPLEMENT_INFO_PATH, encoding='cp1252')
except Exception as e:
    print(f"Error loading CSV files: {e}")
    # Create empty dataframes as fallback
    disease_info = pd.DataFrame()
    supplement_info = pd.DataFrame()

# Initialize Model (Placeholder since .pt file is missing)
model = CNN.CNN(39)
MODEL_LOADED = False

# Note: We need the .pt file to actually make predictions.
# Since it's missing, we'll implement the logic but return a mock response for now.
PT_MODEL_PATH = os.path.join(BASE_DIR, 'plant_disease_model_1_latest.pt')
if os.path.exists(PT_MODEL_PATH):
    try:
        model.load_state_dict(torch.load(PT_MODEL_PATH, map_location=torch.device('cpu')))
        model.eval()
        MODEL_LOADED = True
        print("Disease Detection Model loaded successfully!")
    except Exception as e:
        print(f"Error loading model weights: {e}")
else:
    print(f"WARNING: Model weight file not found at {PT_MODEL_PATH}")

def predict_disease(image_path):
    if not MODEL_LOADED:
        # Mock prediction logic if model isn't loaded
        return np.random.randint(0, 38)
    
    try:
        image = Image.open(image_path)
        image = image.resize((224, 224))
        input_data = TF.to_tensor(image)
        input_data = input_data.view((-1, 3, 224, 224))
        with torch.no_grad():
            output = model(input_data)
        index = np.argmax(output.detach().numpy())
        return int(index)
    except Exception as e:
        print(f"Prediction error: {e}")
        return 0

@app.route('/predict-disease', methods=['POST'])
def submit():
    if 'image' not in request.files:
        return jsonify({'success': False, 'message': 'No image uploaded'}), 400
    
    try:
        image_file = request.files['image']
        file_path = os.path.join(UPLOAD_FOLDER, image_file.filename)
        image_file.save(file_path)
        
        # Get prediction index
        pred_idx = predict_disease(file_path)
        
        # Safely get info from dataframes
        if not disease_info.empty and pred_idx < len(disease_info):
            title = disease_info.iloc[pred_idx]['disease_name']
            description = disease_info.iloc[pred_idx]['description']
            prevention = disease_info.iloc[pred_idx]['Possible Steps']
            image_url = disease_info.iloc[pred_idx]['image_url']
        else:
            title = "Sample Disease (Model Weight Missing)"
            description = "The metadata was loaded but the actual model weight file (.pt) was not found in the cloned repository."
            prevention = "Please ensure 'plant_disease_model_1_latest.pt' is present in the backend directory."
            image_url = ""

        # Remove temp file
        if os.path.exists(file_path):
            os.remove(file_path)

        return jsonify({
            'success': True,
            'prediction': {
                'title': title,
                'description': description,
                'prevention': prevention,
                'imageUrl': image_url,
                'modelLoaded': MODEL_LOADED
            }
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5002, debug=True)
