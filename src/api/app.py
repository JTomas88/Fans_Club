# --ROUTES--

from flask import Flask, jsonify, request, send_from_directory
import os
import cloudinary
import cloudinary.uploader
from api.models import db, Usuario
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from api.utils import generate_sitemap, APIException
from api.admin import setup_admin
from api.commands import setup_commands
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, decode_token
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv

# Cargar el archivo .env
load_dotenv()

# Configure Cloudinary
cloudinary.config(
    cloudinary_url=os.getenv('CLOUDINARY_URL')
)


ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'CFSIENNATOM'  # Cambia esto por tu propia clave secreta
jwt = JWTManager(app)



# Allow CORS requests to this API
CORS(app)

# Configura la base de datos (esto puede variar según tu configuración)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cfsiennadb.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializa SQLAlchemy
db.init_app(app)



# Crear las tablas en la base de datos
with app.app_context():
    db.create_all()  # Esto crea las tablas definidas en los modelos

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify(message="Hello from Flask API")

# # Ruta principal que mostrará el sitemap
@app.route('/')
def sitemap():
    return generate_sitemap(app)



@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

# ___________________ routes ___________________

#Subir foto desde perfil de administrador
@app.route('/admin/subirfoto', methods=['POST'])
def subirfoto():
    file_to_upload = request.files['file']
    if file_to_upload:
        upload = cloudinary.uploader.upload(file_to_upload)
        print('-------------la url donde esta la imagen-------------', upload)
        return jsonify(upload)
    return jsonify({"error": "No file uploaded"}), 400
    



# --Crear nuevo usuario
@app.route('/registro', methods=['POST'])
def crear_usuario():
    data = request.json
    if 'username' not in data or 'email' not in data or 'password' not in data:
        return jsonify({"error": 'Falta alguno de los datos'}), 400
    
    # Busca si ya hay un email registrado con el mismo que se ha introducido y devuelve error si es así
    if Usuario.query.filter_by(email=data['email']).first():
        return jsonify({"error": "El correo electrónico ya existe."}), 400

    codificar_password = generate_password_hash(data['password'])

    nuevo_usuario = Usuario(
        username = data['username'],
        email = data ['email'],
        password = codificar_password
    ) 

    db.session.add(nuevo_usuario)
    db.session.commit()

    access_token = create_access_token(identity=nuevo_usuario.id)

    return jsonify({
        "mensaje": "nuevo usuario creado correctamente",
        "access_token": access_token,
        **nuevo_usuario.serialize()}), 201



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


# --Login a la pagina y creación de token
@app.route('/login', methods = ['POST'])
def crear_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    usuarios = Usuario.query.filter_by(email = email).first()

    if usuarios is None:
        return jsonify({'Error': "No se ha encontrado el correo o contraseña"}), 404
    
    if not check_password_hash(usuarios.password, password):
        return jsonify ({'Error': 'Contraseña incorrecta'})
    
    # Se crea nuevo token de entrada del usuario a la pagina
    access_token = create_access_token(identity = usuarios.id)

    return jsonify({"token": access_token, "email":usuarios.email, "username":usuarios.username, "id": usuarios.id, "role":usuarios.role})


# Editar usuario desde perfil de administrador
@app.route('/admin/editar/<int:id>', methods = ['PUT'])
def admin_editar_usuario_(id):
    usuario = Usuario.query.get(id)

    #Verificar si se enviaron datos
    if usuario is None:
        return jsonify({"Error": "No existe el usuario"}), 400
    
    data = request.json #Obtenemos los datos de la solicitud y los guardamos en data

    try:
        if 'role' in data: 
            usuario.role = data['role']
        
        db.session.commit() #Guardamos los cambios en la bd

        return jsonify({"id": usuario.id, "role":usuario.role}), 200

    except Exception as error:
        db.session.rollback()
        return jsonify({"error": str(error)}), 500


#Eliminar un usuario desde perfil de administrador
@app.route('/admin/eliminarusuario/<int:id>', methods = ['DELETE'])
def admin_eliminar_usuario_(id):
    usuario = Usuario.query.get(id)

    if usuario is None:
        return jsonify({"Error": "No existe el usuario"}), 400

    try: 
        db.session.delete(usuario)
        db.session.commit()
        return jsonify({"Mensaje": "Usuario borrado correctamente"}), 200

    except Exception as error:
        db.session.rollback()
        return jsonify({"error": str(error)}), 500



if __name__ == '__main__':
    app.run(debug=True)

