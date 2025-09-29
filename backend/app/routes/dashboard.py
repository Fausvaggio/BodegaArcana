from flask import Blueprint, jsonify
from ..utils.data_loader import wine_df

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/stats', methods=['GET'])
def get_dataset_stats():
    """
    Devuelve estadísticas descriptivas generales del dataset de vinos.
    """
    if wine_df.empty:
        return jsonify({"error": "Dataset no cargado."}), 500

    desc = wine_df.describe().to_dict()
    result = {}
    for col in wine_df.columns:
        result[col] = {
            "mean": desc[col]["mean"],
            "min": desc[col]["min"],
            "max": desc[col]["max"],
            "std": desc[col]["std"],
            "count": int(desc[col]["count"])
        }
    return jsonify(result)

@dashboard_bp.route('/correlation_matrix', methods=['GET'])
def get_correlation_matrix():
    """
    Devuelve la matriz de correlación del dataset.
    ---
    tags:
      - Dashboard
    responses:
      200:
        description: Un objeto JSON que representa la matriz de correlación.
    """
    if wine_df.empty:
        return jsonify({"error": "Dataset no cargado."}), 500

    corr_matrix = wine_df.corr().to_dict()
    return jsonify(corr_matrix)

