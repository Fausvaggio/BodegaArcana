from flask import Flask
from flask_cors import CORS
from flasgger import Swagger


def create_app():
    """
    Función de fábrica para crear y configurar la aplicación Flask.
    Este es el punto de entrada principal para la inicialización de la app.
    """
    # 1. Crear la instancia de la aplicación Flask
    app = Flask(__name__)

    # 2. Configurar CORS (Cross-Origin Resource Sharing)
    # Esto es crucial para permitir que tu frontend de Angular (que corre en un dominio diferente)
    # se comunique con este backend sin problemas de seguridad del navegador.
    CORS(app)
    
    # 3. Configurar Swagger para la documentación interactiva de la API
    # Define la configuración para que la UI de Swagger se muestre correctamente.
    swagger_config = {
        "headers": [],
        "specs": [
            {
                "endpoint": 'apispec_1',
                "route": '/apispec_1.json',
                "rule_filter": lambda rule: True,  # Muestra todas las reglas
                "model_filter": lambda tag: True,  # Muestra todos los modelos
            }
        ],
        "static_url_path": "/flasgger_static",
        "swagger_ui": True,
        "specs_route": "/apidocs/" # La URL donde estará tu documentación
    }
    swagger = Swagger(app, config=swagger_config)

    # 4. Registrar TODOS los Blueprints (nuestros "routers")
    # Importamos los blueprints desde sus respectivos archivos en la carpeta 'routes'.
    # Es importante hacer la importación dentro de la función para evitar importaciones circulares.
    from .routes.predictions import predictions_bp
    from .routes.dashboard import dashboard_bp
    from .routes.explainability import explainability_bp
    from .routes.analysis import analysis_bp
    from .routes.patterns import patterns_bp
    from .routes.auth import auth_bp, init_jwt

    # 🔑 Inicializa JWT
    init_jwt(app)

    # Registramos cada blueprint en la aplicación, asignándole un prefijo de URL.
    # Esto mantiene nuestros endpoints organizados.
    # Ejemplo: todos los endpoints en predictions_bp empezarán con /api/...
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(predictions_bp, url_prefix='/api')
    app.register_blueprint(dashboard_bp, url_prefix='/api/dashboard')
    app.register_blueprint(explainability_bp, url_prefix='/api/explain')
    app.register_blueprint(analysis_bp, url_prefix='/api/analysis')
    app.register_blueprint(patterns_bp, url_prefix="/api/patterns")
    
    print("Blueprints registrados correctamente. La documentación de la API está disponible en /apidocs/")
    
    # 5. Devolver la aplicación ya configurada
    return app

