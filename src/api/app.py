# --ROUTES--

from flask import Flask, jsonify
from api.models import db, Usuario
from flask_sqlalchemy import SQLAlchemy
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

# Configura la base de datos (esto puede variar según tu configuración)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cfsiennadb.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializa SQLAlchemy
db.init_app(app)

# Crear las tablas en la base de datos
with app.app_context():
    db.create_all()  # Esto crea las tablas definidas en los modelos

@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify(message="Hello from Flask API")

# Ruta principal que mostrará el sitemap
@app.route('/')
def sitemap():
    return generate_sitemap(app)


# ___________________ routes ___________________

# --Crear nuevo usuario
@app.route('/registro', methods=['POST'])
def crear_usuario():
    data = request.json
    if 'username' not in data or 'email' not in data or 'password' not in data:
        return jsonify({"error": 'Falta alguno de los datos'}), 400
    
    codificar_password = generate_password_hash(data['password'])

    nuevo_usuario = Usuario(
        username = data['username'],
        email = data ['email'],
        password = codificar_password
    ) 

    db.session.add(nuevo_usuario)
    db.session.commit()



# --Obtener todos los usuarios
@app.route('/allusers', methods= ['GET'])
def get_allusers():
    allUsers = Usuario.query.all()
    return jsonify([user.serialize() for user in allUsers])


# --Obtener un usuario por su id
@app.route('/users/<int:user_id>', methods= ['GET'])
def get_userbyid(user_id):
    user = Usuario.query.get(user_id)
    if user is None:
        return jsonify({'error': 'Usuario no encontrado'}), 404
    
    return jsonify(user.serialize())


if __name__ == '__main__':
    app.run(debug=True)

