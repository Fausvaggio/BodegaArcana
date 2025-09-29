from flask import Blueprint, request, jsonify
import pandas as pd

# Importamos las variables necesarias de nuestro cargador central.
# 'features' nos ayuda a asegurar el orden correcto de las columnas.
from ..utils.data_loader import nn_similar, wine_df, features

# Renombramos el Blueprint para consistencia.
analysis_bp = Blueprint('analysis', __name__)


@analysis_bp.route('/find_similar', methods=['POST'])
def find_similar():
    """
    Encuentra los 5 vinos más similares a un vino de entrada en el dataset.
    Utiliza un modelo de k-Nearest Neighbors para encontrar los vinos con las características más parecidas.
    ---
    tags:
      - Advanced Analysis
    parameters:
      - name: body
        in: body
        required: true
        schema:
          id: WineInput
          description: Objeto JSON con las 12 características del vino.
          properties:
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
        description: Una lista de objetos JSON, donde cada objeto es un vino similar.
        schema:
          type: array
          items:
            $ref: '#/definitions/WineInput'
      400:
        description: Error - No se recibieron datos.
      500:
        description: Error interno en el servidor.
    """
    data = request.get_json()
    if not data:
        return jsonify({"error": "No se recibieron datos en el cuerpo de la petición."}), 400

    try:
        # Aseguramos que las columnas del DataFrame de entrada estén en el mismo orden que las de entrenamiento.
        input_df = pd.DataFrame([data], columns=features.columns)

        # --- CORRECCIÓN LÓGICA ---
        # El modelo nn_similar se entrenó con datos NO escalados.
        # Por lo tanto, debemos usar los datos de entrada sin escalar para encontrar los vecinos.
        distances, indices = nn_similar.kneighbors(input_df)

        # El primer índice (0) es el propio vino, así que tomamos del 1 al final para obtener los 5 más cercanos.
        similar_wines_indices = indices[0][1:]
        similar_wines_df = wine_df.iloc[similar_wines_indices]

        # Convertimos el DataFrame a una lista de diccionarios (JSON) y lo devolvemos.
        return jsonify(similar_wines_df.to_dict(orient='records'))

    except Exception as e:
        return jsonify({"error": str(e)}), 500

