from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
from extensions import db

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')
app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = os.getenv('UPLOAD_FOLDER', 'uploads')
app.config['MAX_CONTENT_LENGTH'] = int(os.getenv('MAX_CONTENT_LENGTH', 16777216))

# Initialize extensions
db.init_app(app)
CORS(app, origins=[os.getenv('CORS_ORIGIN', 'http://localhost:3000')])

# Initialize CLIP service
from services.clip_service import CLIPService
clip_service = CLIPService()

# Import models first (before routes to avoid circular imports)
from models import Product, User, Order

# Import and register blueprints
from routes import product_routes, user_routes
app.register_blueprint(product_routes.bp)
app.register_blueprint(user_routes.bp)

@app.route('/')
def home():
    return jsonify({
        'message': 'Welcome to Allora Boutique API',
        'version': '1.0.0',
        'endpoints': {
            'products': '/api/products',
            'users': '/api/users',
            'similar_products': '/api/products/<id>/similar'
        }
    })

@app.route('/api/health')
def health_check():
    return jsonify({'status': 'healthy', 'database': 'connected'})

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Resource not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    # Create upload directory if it doesn't exist
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    
    # Create database tables
    with app.app_context():
        db.create_all()
        print("Database tables created successfully!")
        print(f"\n=== Database Connection Details ===")
        print(f"Host: {os.getenv('DB_HOST')}")
        print(f"Port: {os.getenv('DB_PORT')}")
        print(f"Username: {os.getenv('DB_USER')}")
        print(f"Password: {os.getenv('DB_PASSWORD')}")
        print(f"Database: {os.getenv('DB_NAME')}")
        print(f"===================================\n")
    
    # Run the app
    app.run(host='0.0.0.0', port=5000, debug=True)
