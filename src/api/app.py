from flask import Flask, jsonify, request, send_from_directory
import os
import cloudinary
import cloudinary.api
import cloudinary.uploader
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from dotenv import load_dotenv
from api.models import db, Usuario, Evento  # Asegúrate de que esto esté después de inicializar `db`
from api.utils import generate_sitemap, APIException
from api.admin import setup_admin
from api.commands import setup_commands
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager
from datetime import datetime
import requests


# Configuración de la base de datos
app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'CFSIENNATOM'  # Cambia esto por tu propia clave secreta
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cfsiennadb.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)  # Asegúrate de que esto esté después de configurar la app
migrate = Migrate(app, db)


# Cargar el archivo .env
load_dotenv()

# Configure Cloudinary
cloudinary.config(
    cloudinary_url=os.getenv('CLOUDINARY_URL')
)



GOOGLE_API_KEY = 'AIzaSyDyduKdXuV4S-AS3xFgTUvxtTnEiqy5lS8'



# Inicializa CORS y JWT
CORS(app)
jwt = JWTManager(app)



# Rutas
@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify(message="Hello from Flask API")

@app.route('/')
def sitemap():
    return generate_sitemap(app)

@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    static_file_dir = os.path.join(os.path.dirname(
        os.path.realpath(__file__)), '../public/')
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# ___________________ RUTAS FUNCIONALIDADES ___________________

@app.route('/buscar_localidad', methods=['GET'])
def buscar_localidad():
    query = request.args.get('q')
    url = f'https://maps.googleapis.com/maps/api/place/autocomplete/json?input={query}&language=es&types=locality&components=country:ES&key={GOOGLE_API_KEY}'
    
    try:
        # Hacer la solicitud a la API de Google Places
        response = requests.get(url)
        response.raise_for_status()  # Verificar si la solicitud fue exitosa
        data = response.json()  # Parsear la respuesta en formato JSON

        # Extraer las predicciones de la respuesta
        localidades = []
        for item in data.get('predictions', []):
            place_id = item['place_id']

            provincia = detalle_localidad(place_id)

            localidades.append({
                'descripcion': item['description'],  # Descripción completa de la localidad
                'place_id': item['place_id'],    # Identificador único del lugar
                'provincia': provincia
            })

        # Devolver las localidades en formato JSON
        return jsonify(localidades), 200
    except requests.exceptions.RequestException as e:
        # Manejar errores y devolver un mensaje de error
        return jsonify({'error': str(e)}), 500
    

def detalle_localidad(place_id):
        url = f'https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&key={GOOGLE_API_KEY}'
        respuesta = requests.get(url)
        if respuesta.status_code == 200:
            data = respuesta.json()
            address_components = data.get('result', {}).get('address_components',[])

            provincia = None
            for component in address_components:
                if 'administrative_area_level_2' in component ['types']:
                    provincia = component['long_name']
                    break

            return provincia
        else:
            print (f"Error: {respuesta.status_code}")
            return None


    



#Crear carpeta desde perfil de administrador
@app.route('/admin/crearcarpeta', methods=['POST'])
def crearCarpeta():
    nombre_carpeta = request.form.get('folder')

    if nombre_carpeta:
        upload =  cloudinary.api.create_folder(nombre_carpeta) 
        return jsonify(upload)

    return jsonify({"error": "error al crear carpeta"}), 400


#Recuperar las carpetas desde cloudinary y mostrarlas en elfront
@app.route('/admin/mostrarcarpetas', methods=['GET'])
def mostrarCarpetas():
    try:
        recursos = cloudinary.api.subfolders('')
        print("Recursos obtenidos desde cloudinary:", recursos)
        return jsonify(recursos['folders'])
    except Exception as e:
        print("Error al obtener carpetas:", str(e))
        return jsonify({"error": str(e)}), 500


#Mostrar el contenido de las carpetas de cloudinary
@app.route ('/admin/mostrarImagenesCarpetas/<string:nombreCarpeta>', methods=['GET'])
def mostrar_imagenes_carpeta(nombreCarpeta):
    try:
        recursos = cloudinary.api.resources(
            type="upload",
            prefix=nombreCarpeta + '/',
            max_results=100
        )
        archivos = recursos.get('resources', [])
        return archivos
    except cloudinary.exceptions.Error as e:
        print (f"Error al obtener el contenido de la carpeta: {e}")
        return None


#Subir foto para importar a cloudinary
@app.route('/admin/subirfoto', methods=['POST'])
def subirfoto():
    archivos_imagen = request.files.getlist('files')
    nombre_carpeta = request.form.get('folder')

    if archivos_imagen and nombre_carpeta:
        urls = []
        for archivo in archivos_imagen:
            upload = cloudinary.uploader.upload(archivo, folder=nombre_carpeta)
            urls.append(upload['secure_url'])

        return jsonify({"urls": urls})
    
    return jsonify({"error": "no se han subido correctamente los archivos"}), 400

#Crear un evento desde perfil de administrador
@app.route('/admin/crearevento', methods=['POST'])
def crearevento():
    data = request.json

    fecha_str = data['fecha']
    try:
        fecha = datetime.strptime(fecha_str, '%Y-%m-%d').date()
    except ValueError:
        return jsonify({"mensaje": "formato no valido"}), 400
    
    nuevoEvento = Evento(
        fecha = fecha,
        poblacion = data['poblacion'],
        provincia = data['provincia'],
        lugar = data['lugar'],
        hora = data['hora'],
        entradas = data['entradas'],
        observaciones = data['observaciones']
    )

    db.session.add(nuevoEvento)
    db.session.commit()

    return jsonify({
        "mensaje": "Evento creado correctamente",
        **nuevoEvento.serialize()
    }), 201


#Función para obtener todos los eventos creados
@app.route('/admin/obtenereventos', methods=['GET'])
def obtenereventos():
    eventos = Evento.query.all()
    return jsonify([evento.serialize() for evento in eventos])


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


#Editar datos del usuario desde su perfil
@app.route('/users/edit/<int:user_id>', methods=['PUT'])
def editar_usuario(user_id):
    usuario = Usuario.query.get(user_id)
    if usuario is None:
        return jsonify({"error": "usuario no encontrado"}), 404
    
    data = request.json

    if not data:
        return jsonify({"error": "sin datos"}), 400
    
    try:
        if 'name' in data:
            usuario.name = data['name']
        if 'token' in data:
            usuario.token = data['token']
        if 'email' in data:
            usuario.email = data['email']
        if 'id' in data:
            usuario.id = data['id']
        if 'lastname' in data:
            usuario.lastname = data['lastname']
        if 'phone' in data:
            usuario.phone = data['phone']
        if 'town' in data:
            usuario.town = data['town']
        if 'province' in data:
            usuario.province = data['province']
        if 'address' in data:
            usuario.address = data['address']

        db.session.commit()
        return jsonify(data), 200
    
    except Exception as e:
        db.session.rollback()  # Revierte los cambios en caso de error
        return jsonify({"error": str(e)}), 500



#Verificar si la contraseña actual es la correcta
@app.route('/verificarpwactual', methods=['POST'])
def verificarpwactual():
    #Extraemos los datos enviados por el front
    data=request.json
 

    user_id = data.get('userId')
    current_password = data.get('password')



    if not user_id or not current_password:
        return jsonify({"error": "faltan datos"}), 400
    
    user = Usuario.query.get(user_id)
    if not user:
        return jsonify({"Error": "usuario no encontrado"}), 400
    
    if check_password_hash(user.password, current_password):
        return jsonify({'isValid': True}), 200
    else:
        return jsonify({'isValid': False}), 200








#Cambio de contraseña desde perfil del usuario
@app.route('/users/cambiopassword/<int:user_id>', methods=['PUT'])
def cambiopassword(user_id):
    usuario = Usuario.query.get(user_id)
    if usuario is None:
        return jsonify({"error": "usuario no encontrado"}), 404
    
    data = request.json

    codificar_password = generate_password_hash(data['password'])

    usuario.password = codificar_password
    db.session.commit()
    return jsonify({"mensaje": "cambio contrasena ok"}), 200

        







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


