from app import create_app

# 1. Se llama a la "fábrica" para construir la instancia de la aplicación.
#    Flask buscará esta variable 'app' automáticamente gracias al archivo .flaskenv
#    cuando uses el comando `flask run`.
app = create_app()

# 2. (Opcional pero recomendado) Bloque para ejecución directa.
#    Este bloque permite que el servidor también se pueda iniciar de la forma tradicional
#    ejecutando `python run.py` en la terminal.
#    Es útil para depuración o como método alternativo.
if __name__ == '__main__':
    # El parámetro debug=True es muy útil durante el desarrollo,
    # ya que reinicia el servidor automáticamente cada vez que guardas un cambio.
    app.run(debug=True)
