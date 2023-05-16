from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from modulo1.products import db, setup_routes

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:pruebas123@localhost/prueba'
app.config['UPLOAD_FOLDER'] = './images'
db.init_app(app)
CORS(app)

setup_routes(app)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)



#LO MAS COMPLETO FUNCIONAL
'''from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.utils import secure_filename
from flask import send_from_directory
import os
import uuid

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:pruebas123@localhost/prueba'
app.config['UPLOAD_FOLDER'] = './images'
db = SQLAlchemy(app)
CORS(app)

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

@app.route('/products', methods=['GET', 'POST'])
def handle_products():
    if request.method == 'POST':
        name = request.form['name']
        price = float(request.form['price'])
        description = request.form['description']
        image = request.files['image']

        filename = secure_filename(image.filename)
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

if __name__ == '__main__':
    app.run(debug=True)
'''

'''from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.utils import secure_filename
from flask import send_from_directory
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:pruebas123@localhost/prueba'
app.config['UPLOAD_FOLDER'] = './images'
db = SQLAlchemy(app)
CORS(app, resources={r"/*": {"origins": "*"}})

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


@app.route('/products', methods=['GET', 'POST'])
def handle_products():
    if request.method == 'POST':
        name = request.form['name']
        price = float(request.form['price'])
        description = request.form['description']
        image = request.files['image']

        filename = secure_filename(image.filename)
        image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        product = Product(name=name, price=price, description=description, image=filename)
        db.session.add(product)
        db.session.commit()

        return product_schema.jsonify(product)

    elif request.method == 'GET':
        products = Product.query.all()
        return jsonify([product.to_dict() for product in products])

@app.route('/products/<id>', methods=['GET', 'PUT', 'DELETE'])
def handle_product(id):
    product = Product.query.get(id)
    
    if request.method == 'GET':
        return product_schema.jsonify(product)

    elif request.method == 'PUT':
        product.name = request.form['name']
        product.price = float(request.form['price'])
        product.description = request.form['description']

        image = request.files['image']
        filename = secure_filename(image.filename)
        image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        product.image = filename

        db.session.commit()
        return product_schema.jsonify(product)

    elif request.method == 'DELETE':
        db.session.delete(product)
        db.session.commit()
        return product_schema.jsonify(product)
    
@app.route('/images/<filename>')
def serve_image(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True)
    

'''

'''from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:pruebas123@localhost/prueba'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app, resources={r"/*": {"origins": "*"}})


class Products(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(120))

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'description': self.description
        }


@app.route('/products', methods=['GET'])
def get_products():
    products = Products.query.all()
    return jsonify([product.serialize() for product in products])

@app.route('/products', methods=['POST'])
def add_product():
    new_product = Products(
        name=request.json['name'],
        price=request.json['price'],
        description=request.json['description']
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify(new_product.serialize()), 201

@app.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    product = Products.query.get(product_id)
    product.name = request.json['name']
    product.price = request.json['price']
    product.description = request.json['description']
    db.session.commit()
    return jsonify(product.serialize())

@app.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    Products.query.filter_by(id=product_id).delete()
    db.session.commit()
    return '', 204

if __name__ == "__main__":
    app.run(debug=True)
'''