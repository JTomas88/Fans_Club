from flask_sqlalchemy import SQLAlchemy
from enum import Enum


db = SQLAlchemy()

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    is_active = db.Column(db.Boolean(), default=True)
    name = db.Column(db.String(250))
    lastname = db.Column(db.String(250))
    phone = db.Column(db.String(9))
    province = db.Column(db.String(50))
    town = db.Column(db.String(100))
    address = db.Column(db.String(200))
    role = db.Column(db.String(250), nullable=False)

    def serialize(self):
        return{
            "id": self.id,
            "email": self.email,
            "password": self.password,
            "username": self.username,
            "is_active": self.is_active,
            "name": self.name,
            "lastname": self.lastname,
            "phone": self.phone,
            "province": self.province,
            "town": self.town,
            "address": self.address,
            "role": self.role
        }
    


