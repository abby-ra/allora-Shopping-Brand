import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProduct, getSimilarProducts } from '../services/api';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState('S');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await getProduct(id);
      setProduct(data);
      
      // Load similar products using AI
      const similar = await getSimilarProducts(id);
      setSimilarProducts(similar);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  const hasDiscount = product.original_price && product.original_price > product.price;

  return (
    <div className="product-detail container">
      <div className="product-main">
        <div className="product-images">
          <img 
            src={product.image_url || '/placeholder.jpg'} 
            alt={product.name}
            className="main-image"
          />
        </div>

        <div className="product-details">
          <p className="brand-name">ALLORA</p>
          <h1 className="product-title">{product.name}</h1>
          
          <div className="product-price">
            {hasDiscount && (
              <span className="original-price">Rs. {product.original_price.toFixed(2)}</span>
            )}
            <span className="sale-price">Rs. {product.price.toFixed(2)}</span>
            {product.stock === 0 && <span className="sold-out-badge">Sold out</span>}
          </div>

          <p className="shipping-info">Shipping calculated at checkout.</p>

          {/* Size Selection */}
          <div className="size-section">
            <label>SIZE</label>
            <div className="size-options">
              {['S', 'M', 'L'].map(size => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <a href="#size-chart" className="size-chart-link">Size Chart</a>
          </div>

          {/* Product Info */}
          <div className="product-info-section">
            <div className="info-row">
              <strong>Fabric:</strong> <span>{product.fabric || 'Cotton'}</span>
            </div>
            {product.lining && (
              <div className="info-row">
                <strong>Lining:</strong> <span>Yes</span>
              </div>
            )}
            {product.style && (
              <div className="info-row">
                <strong>Style:</strong> <span>{product.style}</span>
              </div>
            )}
            {product.color && (
              <div className="info-row">
                <strong>Color:</strong> <span>{product.color}</span>
              </div>
            )}
            <div className="info-row">
              <strong>Length:</strong> <span>41-44 inches</span>
            </div>
          </div>

          {/* Description */}
          {product.description && (
            <div className="description-section">
              <p>{product.description}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="btn-add-to-cart" disabled={product.stock === 0}>
              {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
            </button>
          </div>

          {/* Collapsible Sections */}
          <div className="collapsible-sections">
            <details>
              <summary>Care Instructions</summary>
              <p>Hand wash or machine wash in cold water. Do not bleach. Line dry in shade.</p>
            </details>
            <details>
              <summary>Disclaimer</summary>
              <p>Colors may vary slightly due to screen settings and lighting conditions.</p>
            </details>
            <details>
              <summary>Return Policy</summary>
              <p>Returns accepted within 7 days of delivery. Product must be unused and in original packaging.</p>
            </details>
            <details>
              <summary>Shipping</summary>
              <p>Standard shipping takes 5-7 business days. Express shipping available.</p>
            </details>
          </div>
        </div>
      </div>

      {/* Similar Products - AI Powered */}
      {similarProducts.length > 0 && (
        <section className="similar-products">
          <h2 className="section-title">You may also like</h2>
          <div className="products-grid">
            {similarProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetail;
