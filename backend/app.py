import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models import db
from routes.auth import auth_bp
from routes.user import user_bp
from routes.stocks import stocks_bp
from routes.dashboard import dashboard_bp
from routes.chat import chat_bp
from routes.education import education_bp

def create_app():
    app = Flask(__name__)
    
    # Configure app
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'finguide_super_secret_key_2026')
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'finguide_jwt_secret_key_2026')
    
    # Database
    db_path = os.path.join(app.root_path, 'instance', 'finguide.db')
    os.makedirs(os.path.dirname(db_path), exist_ok=True)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', f'sqlite:///{db_path}')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Extensions
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    JWTManager(app)
    db.init_app(app)
    
    # Register blueprints with /api prefix
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(user_bp, url_prefix='/api/user')
    app.register_blueprint(stocks_bp, url_prefix='/api/stocks')
    app.register_blueprint(dashboard_bp, url_prefix='/api/dashboard')
    app.register_blueprint(chat_bp, url_prefix='/api/chat')
    app.register_blueprint(education_bp, url_prefix='/api/education')
    
    @app.route('/')
    def root():
        return jsonify({'message': 'FinGuide AI API is online', 'version': '1.0.0'}), 200
        
    with app.app_context():
        db.create_all()
        
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='127.0.0.1', port=5000, debug=True)
