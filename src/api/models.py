from flask_sqlalchemy import SQLAlchemy
from enum import Enum


db = SQLAlchemy()

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
    username = db.Column(db.String(120), nullable=False)
    name = db.Column(db.String(250))
    lastname = db.Column(db.String(250))
    phone = db.Column(db.String(9))
    province = db.Column(db.String(50))
    town = db.Column(db.String(100))
    address = db.Column(db.String(200))
    role = db.Column(db.String(250), nullable=False, default="user")

    def serialize(self):
        return{
            "id": self.id,
            "email": self.email,
            "password": self.password,
            "username": self.username,
            "name": self.name,
            "lastname": self.lastname,
            "phone": self.phone,
            "province": self.province,
            "town": self.town,
            "address": self.address,
            "role": self.role
        }
    
class Evento(db.Model):
    __tablename__ = 'eventos'
    id = db.Column(db.Integer, primary_key=True)
    fecha = db.Column(db.Date)
    poblacion = db.Column(db.String(100))
    provincia = db.Column(db.String(100))
    lugar = db.Column(db.String(200))
    hora = db.Column(db.String(10))
    entradas = db.Column(db.String(200))
    observaciones = db.Column(db.String(500))

    def serialize(self):
        return {
            "id": self.id,
            "fecha": self.fecha,
            "poblacion": self.poblacion,
            "provincia": self.provincia,
            "lugar": self.lugar,
            "hora": self.hora,
            "entradas": self.entradas,
            "observaciones": self.observaciones
        }