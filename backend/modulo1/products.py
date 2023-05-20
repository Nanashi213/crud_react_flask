from flask import request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
from flask import send_from_directory
import uuid
import os
import sys
sys.path.append('..')
from settings import db


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(120), nullable=False)
    image = db.Column(db.String(120), nullable=False)
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'description': self.description,
            'image': self.image
        }

def setup_routes(app):
    @app.route('/products', methods=['GET', 'POST'])
    def handle_products():
        if request.method == 'POST':
            name = request.form['name']
            price = float(request.form['price'])
            description = request.form['description']
            image = request.files['image']


            _, ext = os.path.splitext(image.filename)  # Obtiene la extensión del archivo
            unique_filename = f"{uuid.uuid4().hex}{ext}"  # Genera un nombre de archivo único
            image.save(os.path.join(app.config['UPLOAD_FOLDER'], unique_filename))

            product = Product(name=name, price=price, description=description, image=unique_filename)
            db.session.add(product)
            db.session.commit()
    
            return jsonify(product.to_dict())

        elif request.method == 'GET':
            products = Product.query.all()
            return jsonify([product.to_dict() for product in products])

    @app.route('/products/<id>', methods=['GET', 'PUT', 'DELETE'])
    def handle_product(id):
        product = Product.query.get(id)
        
        if request.method == 'GET':
            return jsonify(product.to_dict())

        elif request.method == 'PUT':
            product.name = request.form['name']
            product.price = float(request.form['price'])
            product.description = request.form['description']

            image = request.files['image']
            filename = secure_filename(image.filename)
            image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            product.image = filename

            db.session.commit()
            return jsonify(product.to_dict())

        elif request.method == 'DELETE':
            if os.path.exists(os.path.join(app.config['UPLOAD_FOLDER'], product.image)):
                os.remove(os.path.join(app.config['UPLOAD_FOLDER'], product.image))
            db.session.delete(product)
            db.session.commit()
            return jsonify(product.to_dict())
    
    @app.route('/images/<filename>')
    def serve_image(filename):
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
