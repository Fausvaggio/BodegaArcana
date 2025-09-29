from flask import Blueprint, jsonify
import pandas as pd
from ..utils.data_loader import wine_df, features

patterns_bp = Blueprint("patterns", __name__)

# 1. Distribución de calidades
@patterns_bp.route("/quality_distribution", methods=["GET"])
def quality_distribution():
    """
    Devuelve la frecuencia de cada nivel de calidad en el dataset.
    ---
    tags:
      - Patterns
    responses:
      200:
        description: Conteo de vinos por calidad
    """
    if wine_df.empty:
        return jsonify({"error": "Dataset no cargado"}), 500

    dist = wine_df["quality"].value_counts().sort_index().to_dict()
    return jsonify(dist)


# 2. Promedio de características para una calidad específica
@patterns_bp.route("/quality_relationships/<int:quality>", methods=["GET"])
def quality_relationships(quality):
    """
    Devuelve los promedios de características para los vinos de una calidad dada.
    ---
    tags:
      - Patterns
    parameters:
      - name: quality
        in: path
        type: integer
        required: true
        description: Nivel de calidad (ej. 3, 4, 5, 6, 7, 8, 9)
    responses:
      200:
        description: Promedios de características
    """
    if wine_df.empty:
        return jsonify({"error": "Dataset no cargado"}), 500

    subset = wine_df[wine_df["quality"] == quality]
    if subset.empty:
        return jsonify({"error": f"No hay vinos con calidad {quality}"}), 404

    means = subset.drop(columns=["quality"]).mean().to_dict()
    return jsonify(means)


# 3. Evolución de una característica según la calidad
@patterns_bp.route("/feature_vs_quality/<feature>", methods=["GET"])
def feature_vs_quality(feature):
    """
    Devuelve cómo cambia una característica según la calidad.
    ---
    tags:
      - Patterns
    parameters:
      - name: feature
        in: path
        type: string
        required: true
        description: Nombre de la característica (ej. alcohol, pH, density, etc.)
    responses:
      200:
        description: Valores promedio de la característica por calidad
    """
    if wine_df.empty:
        return jsonify({"error": "Dataset no cargado"}), 500

    if feature not in wine_df.columns:
        return jsonify({"error": f"La característica '{feature}' no existe"}), 400

    grouped = wine_df.groupby("quality")[feature].mean().to_dict()
    return jsonify(grouped)


# 4. Heatmap calidad × características
@patterns_bp.route("/heatmap", methods=["GET"])
def quality_heatmap():
    """
    Devuelve una matriz calidad × características con promedios.
    ---
    tags:
      - Patterns
    responses:
      200:
        description: Matriz en formato JSON
    """
    if wine_df.empty:
        return jsonify({"error": "Dataset no cargado"}), 500

    pivot = wine_df.groupby("quality").mean().round(3)
    result = pivot.to_dict(orient="index")
    return jsonify(result)

@patterns_bp.route('/quality_distribution_by_type', methods=['GET'])
def quality_distribution_by_type():
    """
    Devuelve la distribución de calidad separada por tipo de vino (tinto=0, blanco=1).
    Estructura:
    {
      "3": {"tinto": 10, "blanco": 20},
      "4": {"tinto": 50, "blanco": 80},
      ...
    }
    """
    try:
        import pandas as pd
        from app.utils.data_loader import wine_df

        # Dataset con columna wine_type (0=tinto, 1=blanco)
        df = wine_df.copy()
        df['wine_type'] = df['wine_type'].map({0: "tinto", 1: "blanco"})

        result = {}
        for quality in sorted(df['quality'].unique()):
            counts = df[df['quality'] == quality]['wine_type'].value_counts().to_dict()
            result[str(quality)] = {
                "tinto": counts.get("tinto", 0),
                "blanco": counts.get("blanco", 0)
            }

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500