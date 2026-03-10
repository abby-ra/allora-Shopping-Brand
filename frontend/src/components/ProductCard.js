import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product }) {
  const hasDiscount = product.original_price && product.original_price > product.price;

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <div className="product-image-container">
          {product.is_sale && <span className="sale-badge">Sale</span>}
          <img 
            src={product.image_url || '/placeholder.jpg'} 
            alt={product.name}
            className="product-image"
          />
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          {product.description && (
            <p className="product-description">{product.description}</p>
          )}
          <div className="product-pricing">
            {hasDiscount && (
              <span className="original-price">Rs. {product.original_price.toFixed(2)}</span>
            )}
            <span className="current-price">
              {product.price ? `Rs. ${product.price.toFixed(2)}` : 'From Rs. ' + product.price}
            </span>
          </div>
          <button className="shop-now-btn">shop now →</button>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
