from flask import Blueprint, request, jsonify
import pandas as pd

# Importamos las variables 'models' y 'scaler' desde nuestro cargador de datos centralizado.
from ..utils.data_loader import models, scaler, features

# 1. Creamos el Blueprint
predictions_bp = Blueprint('predictions', __name__)


# 2. Definimos la Ruta del Endpoint y su Documentación CORREGIDA
@predictions_bp.route('/predict', methods=['POST'])
def predict():
    """
    Predice la calidad del vino usando un modelo seleccionado por el usuario.
    Este endpoint espera un objeto JSON con las 12 características del vino y el modelo a utilizar.
    ---
    tags:
      - Predicciones
    parameters:
      - name: body
        in: body
        required: true
        schema:
          id: WinePredictionRequest
          description: Objeto JSON con los datos del vino para la predicción.
          required:
            - model_choice
            - alcohol
            # ... y el resto de las características
          properties:
            model_choice:
              type: string
              description: "El modelo a utilizar. Opciones: 'rf' (Random Forest), 'gb' (Gradient Boosting), 'nn' (Neural Network)."
              enum: ['rf', 'gb', 'nn']
              example: 'rf'
            # --- ¡AQUÍ ESTÁN LOS CAMBIOS! Nombres con guion bajo ---
            fixed_acidity:
              type: number
              example: 7.0
            volatile_acidity:
              type: number
              example: 0.27
            citric_acid:
              type: number
              example: 0.36
            residual_sugar:
              type: number
              example: 20.7
            chlorides:
              type: number
              example: 0.045
            free_sulfur_dioxide:
              type: number
              example: 45.0
            total_sulfur_dioxide:
              type: number
              example: 170.0
            density:
              type: number
              example: 1.001
            pH:
              type: number
              example: 3.00
            sulphates:
              type: number
              example: 0.45
            alcohol:
              type: number
              example: 8.8
            wine_type:
              type: integer
              description: "Tipo de vino: 0 para tinto, 1 para blanco."
              example: 1
    responses:
      200:
        description: La predicción de calidad del modelo seleccionado.
      400:
        description: "Error: La petición es incorrecta."
      500:
        description: Error interno en el servidor.
    """

    # Mapeo de columnas limpias (API) -> nombres originales del modelo
    column_mapping = {
        "fixed_acidity": "fixed acidity",
        "volatile_acidity": "volatile acidity",
        "citric_acid": "citric acid",
        "residual_sugar": "residual sugar",
        "chlorides": "chlorides",
        "free_sulfur_dioxide": "free sulfur dioxide",
        "total_sulfur_dioxide": "total sulfur dioxide",
        "density": "density",
        "pH": "pH",
        "sulphates": "sulphates",
        "alcohol": "alcohol",
        "wine_type": "wine_type"  # <- este queda igual
    }

    data = request.get_json()
    if not data:
        return jsonify({"error": "No se recibieron datos."}), 400

    model_choice = data.pop('model_choice', None)

    if not model_choice or model_choice not in models:
        return jsonify({"error": "Debe proporcionar un 'model_choice' válido: 'rf', 'gb', o 'nn'."}), 400

    try:
        # Renombramos las claves del JSON entrante para que coincidan con el modelo
        # Esto hace la API más flexible, aceptando ambos formatos.
        renamed_data = {key.replace(' ', '_'): value for key, value in data.items()}

        # Crear DataFrame con columnas limpias
        input_df = pd.DataFrame([renamed_data])

        # Renombrar solo las columnas necesarias
        input_df = input_df.rename(columns=column_mapping)

        # Reordenar columnas como el modelo espera
        input_df = input_df[list(column_mapping.values())]

        prediction = ""
        model_to_use = models[model_choice]

        if model_choice == 'nn':
            input_scaled = scaler.transform(input_df)
            prediction = model_to_use.predict(input_scaled)[0]
        else:
            prediction = model_to_use.predict(input_df)[0]

        response = {
            'prediction': prediction,
            'model_used': model_choice
        }

        return jsonify(response)

    except Exception as e:
        return jsonify({"error": f"Ocurrió un error durante la predicción: {str(e)}"}), 500

