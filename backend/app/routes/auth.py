from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    JWTManager, create_access_token,
    jwt_required, get_jwt_identity
)
from datetime import timedelta

auth_bp = Blueprint("auth", __name__)

# "Usuarios en memoria"
USERS = {
    "alice": "12345",
    "bob": "qwerty",
    "admin": "admin123"
}

# Configuración de JWT (se hace en create_app)
jwt = None

def init_jwt(app):
    global jwt
    app.config["JWT_SECRET_KEY"] = "super-secret-key"  # ⚠️ cambia en producción
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
    jwt = JWTManager(app)


# Endpoint para login
@auth_bp.route("/login", methods=["POST"])
def login():
    """
    Autenticación con usuario y clave (en memoria).
    Devuelve un JWT si es válido.
    ---
    tags:
      - Auth
    parameters:
      - name: body
        in: body
        required: true
        schema:
          properties:
            username:
              type: string
            password:
              type: string
    responses:
      200:
        description: Token JWT
      401:
        description: Credenciales inválidas
    """
    data = request.get_json(silent=True) or {}
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Faltan credenciales"}), 400

    if username in USERS and USERS[username] == password:
        access_token = create_access_token(identity=username)
        return jsonify(
            access_token=access_token,
            token_type="bearer"
        ), 200
    else:
        return jsonify({"error": "Credenciales inválidas"}), 401


# Endpoint protegido
@auth_bp.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    """
    Endpoint de prueba protegido con JWT.
    """
    current_user = get_jwt_identity()
    return jsonify(message=f"Hola {current_user}, accediste a un recurso protegido.")
