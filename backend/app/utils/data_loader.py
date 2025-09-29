import pandas as pd
import joblib
import os
from sklearn.neighbors import NearestNeighbors
import shap
import sys

# --- 1. CONSTRUIR RUTAS ---
current_dir = os.path.dirname(os.path.abspath(__file__))
app_dir = os.path.join(current_dir, '..')
data_dir = os.path.join(app_dir, 'data')
models_dir = os.path.join(app_dir, 'models')

# --- 2. CARGAR DATASETS ---
try:
    red_wine_path = os.path.join(data_dir, 'winequality-red.csv')
    white_wine_path = os.path.join(data_dir, 'winequality-white.csv')
    red_wine = pd.read_csv(red_wine_path, sep=';')
    white_wine = pd.read_csv(white_wine_path, sep=';')
    red_wine['wine_type'] = 0
    white_wine['wine_type'] = 1
    wine_df = pd.concat([red_wine, white_wine], ignore_index=True)
    wine_df.columns = wine_df.columns.str.replace(' ', '_')
    print("Datasets cargados y combinados correctamente desde la carpeta 'app/data/'.")
except FileNotFoundError:
    print(f"Error: No se encontraron los archivos CSV en la carpeta '{data_dir}'.", file=sys.stderr)
    wine_df = pd.DataFrame()

# --- 3. CARGAR MODELOS DE PREDICCIÓN Y ESCALADOR ---
try:
    rf_model = joblib.load(os.path.join(models_dir, 'wine_quality_rf_model.joblib'))
    gb_model = joblib.load(os.path.join(models_dir, 'wine_quality_gb_model.joblib'))
    nn_model = joblib.load(os.path.join(models_dir, 'wine_quality_nn_model.joblib'))
    scaler = joblib.load(os.path.join(models_dir, 'scaler.joblib'))
    models = {'rf': rf_model, 'gb': gb_model, 'nn': nn_model}
    print("Modelos de predicción y escalador cargados.")
except FileNotFoundError:
    print(f"Error: No se encontraron los archivos de modelo en '{models_dir}'.", file=sys.stderr)
    models = {}
    scaler = None

# --- 4. PREPARAR DATOS Y MODELO PARA VINOS SIMILARES ---
if not wine_df.empty:
    features = wine_df.drop('quality', axis=1)

    # --- ¡AQUÍ ESTÁ LA CORRECCIÓN! ---
    # Renombramos 'nn_finder' a 'nn_similar' para que coincida con el import.
    nn_similar = NearestNeighbors(n_neighbors=6, algorithm='ball_tree')
    nn_similar.fit(features)
    print("Modelo de vinos similares entrenado.")
else:
    features = pd.DataFrame()
    nn_similar = None  # También corregimos aquí.

# --- 5. PREPARAR EXPLICADORES DE SHAP ---
explainers = {}
if models and not features.empty:
    background_data = shap.sample(features, 100)
    explainers['rf'] = shap.TreeExplainer(models['rf'])
    explainers['gb'] = shap.KernelExplainer(models['gb'].predict_proba, background_data)
    explainers['nn'] = shap.KernelExplainer(models['nn'].predict_proba, background_data)
    print("Explicadores de SHAP creados y listos.")
else:
    print("Advertencia: No se pudieron crear los explicadores de SHAP.", file=sys.stderr)

