from flask import Blueprint, jsonify, request
from extensions import db
from models import Product
from services.clip_service import CLIPService
import os

bp = Blueprint('products', __name__, url_prefix='/api')
clip_service = None

def get_clip_service():
    global clip_service
    if clip_service is None:
        clip_service = CLIPService()
    return clip_service

@bp.route('/products', methods=['GET'])
def get_products():
    """Get all products or filter by category."""
    try:
        category = request.args.get('category')
        
        if category and category != 'all':
            products = Product.query.filter_by(category=category).all()
        else:
            products = Product.query.all()
        
        return jsonify([product.to_dict() for product in products]), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """Get a single product by ID."""
    try:
        product = Product.query.get_or_404(product_id)
        return jsonify(product.to_dict()), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 404

@bp.route('/products/<int:product_id>/similar', methods=['GET'])
def get_similar_products(product_id):
    """
    Get similar products using CLIP embeddings.
    This is the AI-powered recommendation feature.
    """
    try:
        # Get the product
        product = Product.query.get_or_404(product_id)
        
        if not product.image_embedding:
            return jsonify({'error': 'Product has no image embedding'}), 400
        
        # Get all products with embeddings
        all_products = Product.query.filter(
            Product.id != product_id,
            Product.image_embedding.isnot(None)
        ).all()
        
        if not all_products:
            return jsonify([]), 200
        
        # Prepare embeddings
        product_embeddings = [(p.id, p.image_embedding) for p in all_products]
        
        # Find similar products using CLIP
        clip = get_clip_service()
        import json
        query_embedding = json.loads(product.image_embedding)
        similar_ids = clip.find_similar_products(query_embedding, product_embeddings, top_k=4)
        
        # Get similar products
        similar_products = Product.query.filter(Product.id.in_(similar_ids)).all()
        
        return jsonify([p.to_dict() for p in similar_products]), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/products/search', methods=['GET'])
def search_products():
    """Search products by name or description."""
    try:
        query = request.args.get('q', '')
        
        if not query:
            return jsonify([]), 200
        
        products = Product.query.filter(
            db.or_(
                Product.name.ilike(f'%{query}%'),
                Product.description.ilike(f'%{query}%')
            )
        ).all()
        
        return jsonify([product.to_dict() for product in products]), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/products', methods=['POST'])
def create_product():
    """Create a new product with image embedding."""
    try:
        data = request.get_json()
        
        # Create product
        product = Product(
            name=data.get('name'),
            description=data.get('description'),
            price=data.get('price'),
            original_price=data.get('original_price'),
            category=data.get('category'),
            fabric=data.get('fabric'),
            color=data.get('color'),
            style=data.get('style'),
            stock=data.get('stock', 0),
            image_url=data.get('image_url'),
            is_featured=data.get('is_featured', False),
            is_bestseller=data.get('is_bestseller', False),
            is_sale=data.get('is_sale', False),
            lining=data.get('lining', False)
        )
        
        # Generate embedding if image path provided
        if data.get('image_path'):
            clip = get_clip_service()
            embedding = clip.process_product_image(data['image_path'])
            if embedding:
                product.image_embedding = embedding
        
        db.session.add(product)
        db.session.commit()
        
        return jsonify(product.to_dict()), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@bp.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    """Update a product."""
    try:
        product = Product.query.get_or_404(product_id)
        data = request.get_json()
        
        # Update fields
        for field in ['name', 'description', 'price', 'original_price', 'category', 
                      'fabric', 'color', 'style', 'stock', 'image_url', 
                      'is_featured', 'is_bestseller', 'is_sale', 'lining']:
            if field in data:
                setattr(product, field, data[field])
        
        # Update embedding if new image provided
        if data.get('image_path'):
            clip = get_clip_service()
            embedding = clip.process_product_image(data['image_path'])
            if embedding:
                product.image_embedding = embedding
        
        db.session.commit()
        
        return jsonify(product.to_dict()), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@bp.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    """Delete a product."""
    try:
        product = Product.query.get_or_404(product_id)
        db.session.delete(product)
        db.session.commit()
        
        return jsonify({'message': 'Product deleted successfully'}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
