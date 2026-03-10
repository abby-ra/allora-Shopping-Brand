from flask import Blueprint, jsonify, request
from extensions import db
from models import User, Order, OrderItem
from datetime import datetime
import secrets

bp = Blueprint('users', __name__, url_prefix='/api')

@bp.route('/users', methods=['GET'])
def get_users():
    """Get all users."""
    try:
        users = User.query.all()
        return jsonify([user.to_dict() for user in users]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """Get a single user by ID."""
    try:
        user = User.query.get_or_404(user_id)
        return jsonify(user.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 404

@bp.route('/users', methods=['POST'])
def create_user():
    """Create a new user."""
    try:
        data = request.get_json()
        
        # Check if user already exists
        if User.query.filter_by(email=data.get('email')).first():
            return jsonify({'error': 'Email already registered'}), 400
        
        user = User(
            email=data.get('email'),
            first_name=data.get('first_name'),
            last_name=data.get('last_name'),
            phone=data.get('phone'),
            address=data.get('address'),
            city=data.get('city'),
            state=data.get('state'),
            pincode=data.get('pincode')
        )
        
        user.set_password(data.get('password'))
        
        db.session.add(user)
        db.session.commit()
        
        return jsonify(user.to_dict()), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@bp.route('/users/<int:user_id>/orders', methods=['GET'])
def get_user_orders(user_id):
    """Get all orders for a user."""
    try:
        orders = Order.query.filter_by(user_id=user_id).order_by(Order.created_at.desc()).all()
        return jsonify([order.to_dict() for order in orders]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/orders', methods=['POST'])
def create_order():
    """Create a new order."""
    try:
        data = request.get_json()
        
        # Generate unique order number
        order_number = f"ORD-{datetime.now().strftime('%Y%m%d')}-{secrets.token_hex(4).upper()}"
        
        order = Order(
            user_id=data.get('user_id'),
            order_number=order_number,
            total_amount=data.get('total_amount'),
            shipping_address=data.get('shipping_address'),
            payment_method=data.get('payment_method', 'COD')
        )
        
        db.session.add(order)
        db.session.flush()  # Get order ID
        
        # Add order items
        for item_data in data.get('items', []):
            order_item = OrderItem(
                order_id=order.id,
                product_id=item_data.get('product_id'),
                quantity=item_data.get('quantity', 1),
                size=item_data.get('size'),
                price=item_data.get('price')
            )
            db.session.add(order_item)
        
        db.session.commit()
        
        return jsonify(order.to_dict()), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@bp.route('/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    """Get order details."""
    try:
        order = Order.query.get_or_404(order_id)
        return jsonify(order.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 404
