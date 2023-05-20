from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from modulo1.products import setup_routes
from settings import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///database.db"
app.config['UPLOAD_FOLDER'] = './images'
db.init_app(app)
CORS(app)
    
setup_routes(app)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
