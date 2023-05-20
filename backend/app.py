import json
from flask import Flask, jsonify, request
from flask_cors import CORS
#LOGIN
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
							   unset_jwt_cookies, jwt_required, JWTManager
from datetime import datetime, timedelta, timezone

#MODULOS
from modulo1.products import setup_routes as setup_routes_products
from settings import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///database.db"
app.config['UPLOAD_FOLDER'] = './images'
app.config["JWT_SECRET_KEY"] = "prueba"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=35)
jwt = JWTManager(app)
db.init_app(app)
CORS(app)
    
@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        print(get_jwt())
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response
    
@app.route('/token', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return {"msg": "Wrong email or password"}, 401

    access_token = create_access_token(identity=email)
    response = {"access_token":access_token}
    return response

@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

setup_routes_products(app)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
