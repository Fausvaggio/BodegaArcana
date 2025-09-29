from flask import Blueprint, jsonify, request
import pandas as pd
import numpy as np

# Importamos las variables que necesitamos de nuestro cargador central.
from ..utils.data_loader import models, scaler, features, explainers

# 1. Creamos el Blueprint
explainability_bp = Blueprint('explainability', __name__)


# 2. Endpoint para la Importancia de Características Global
@explainability_bp.route('/feature_importance/<model_choice>', methods=['GET'])
def get_feature_importance(model_choice):
    """
    Devuelve la importancia global de cada característica para un modelo.
    Esto muestra qué características considera el modelo más importantes en general.
    ---
    tags:
      - Explainability (XAI)
    parameters:
      - name: model_choice
        in: path
        type: string
        required: true
        enum: ['rf', 'gb']
        description: "El modelo a utilizar. Nota: La importancia directa no está disponible para la Red Neuronal ('nn')."
    responses:
      200:
        description: Un objeto JSON con la importancia de cada característica.
      400:
        description: El modelo elegido no es válido o no tiene la propiedad 'feature_importances_'.
    """
    # Verificamos que se haya elegido un modelo compatible (los de árbol tienen esta propiedad)
    if model_choice not in ['rf', 'gb']:
        return jsonify({"error": "Modelo no válido. Elija 'rf' (Random Forest) o 'gb' (Gradient Boosting)."}), 400

    model = models[model_choice]

    # Verificamos que el modelo tenga el atributo para la importancia de características
    if not hasattr(model, 'feature_importances_'):
        return jsonify({"error": f"El modelo '{model_choice}' no tiene la propiedad 'feature_importances_'."}), 400

    importances = model.feature_importances_
    feature_names = features.columns

    # Creamos un diccionario legible y lo devolvemos como JSON
    importance_dict = dict(zip(feature_names, importances))

    return jsonify(importance_dict)


# 3. Endpoint para Explicar una Predicción Específica
@explainability_bp.route("/explain_prediction", methods=["POST"])
def explain_prediction():
    """
    Explica una predicción específica mostrando la contribución (valor SHAP) de cada característica.
    """
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No se recibieron datos"}), 400

        # Modelo elegido
        model_choice = data.get("model_choice", "rf")
        if model_choice not in models:
            return jsonify({"error": f"Modelo no soportado: {model_choice}"}), 400

        model = models[model_choice]

        # 🔑 Mapeo de snake_case → nombres originales usados en el modelo entrenado
        feature_mapping = {
            "fixed_acidity": "fixed acidity",
            "volatile_acidity": "volatile acidity",
            "citric_acid": "citric acid",
            "residual_sugar": "residual sugar",
            "free_sulfur_dioxide": "free sulfur dioxide",
            "total_sulfur_dioxide": "total sulfur dioxide",
            "density": "density",
            "pH": "pH",
            "sulphates": "sulphates",
            "alcohol": "alcohol",
            "chlorides": "chlorides",
            "wine_type": "wine_type"  # se mantiene igual
        }

        # Normalizar claves de entrada
        input_dict = {
            feature_mapping.get(k, k): v
            for k, v in data.items()
            if k != "model_choice"
        }

        features = pd.DataFrame([input_dict])

        # 🔄 Reordenar al orden original del modelo
        if hasattr(model, "feature_names_in_"):
            features = features[model.feature_names_in_]

        # Predicción
        prediction = model.predict(features)[0]

        # SHAP values
        explainer = explainers.get(model_choice)
        if explainer is None:
            return jsonify({"error": "No se encontró el explainer para este modelo"}), 500

        shap_values = explainer.shap_values(features)

        # Clasificadores: lista por clase
        if isinstance(shap_values, list):
            class_idx = int(prediction)
            shap_values_for_class = shap_values[class_idx]
        else:
            shap_values_for_class = shap_values

        # Convertir a vector 1D
        shap_values_for_class = np.array(shap_values_for_class)
        if shap_values_for_class.ndim > 1:
            shap_values_for_class = shap_values_for_class[0]
        shap_values_for_class = np.array(shap_values_for_class).ravel()

        # Diccionario {feature: valor} robusto
        explanation = {}
        for feature, value in zip(features.columns, shap_values_for_class):
            arr = np.array(value).ravel()
            explanation[feature] = float(arr[0]) if arr.size > 0 else 0.0

        # ✅ Convertir prediction y expected_value a JSON safe
        pred_value = prediction
        if isinstance(pred_value, (np.generic, np.ndarray)):
            pred_value = pred_value.item() if hasattr(pred_value, "item") else str(pred_value)

        exp_val = getattr(explainer, "expected_value", None)
        if isinstance(exp_val, (np.generic, np.ndarray)):
            exp_val = float(np.array(exp_val).ravel()[0])

        return jsonify({
            "prediction": str(pred_value),
            "model": model_choice,
            "expected_value": exp_val,
            "shap_values": explanation
        })

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": f"Ocurrió un error durante la explicación: {str(e)}"}), 500
