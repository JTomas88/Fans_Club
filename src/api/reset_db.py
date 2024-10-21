import os
from api.app import app  # Asegúrate de que este import sea correcto
from api.models import db  # Asegúrate de que este import sea correcto

# Elimina el archivo de la base de datos si existe
if os.path.exists('cfsiennadb.db'):
    os.remove('cfsiennadb.db')
    print("Base de datos eliminada.")

# Crea la nueva base de datos y las tablas
with app.app_context():
    db.create_all()
    print("Base de datos creada y tablas inicializadas.")
