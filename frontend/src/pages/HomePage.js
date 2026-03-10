import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';
import './HomePage.css';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const featuredDesigners = [
    { name: 'JHANA SRUTHIKA', description: 'Pure and elegant, jhana sets its tone for the day', image: '/images/designer1.jpg' },
    { name: 'DHARANI', description: 'Quality of outfit is very good! Gifting option is just awesome comfortable to wear in hot day', image: '/images/designer2.jpg' },
    { name: 'PREETTY', description: 'Amazing dress | like it |color', image: '/images/designer3.jpg' }
  ];

  const recentProducts = products.filter(p => p.is_featured).slice(0, 3);
  const bestSellers = products.filter(p => p.is_bestseller).slice(0, 8);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Allora</h1>
          <p>Discover Your Perfect Style</p>
          <button className="btn-primary">Shop Now</button>
        </div>
      </section>

      {/* Featured Designers */}
      <section className="featured-section container">
        <div className="featured-grid">
          {featuredDesigners.map((designer, index) => (
            <div key={index} className="featured-card">
              <div className="featured-image-placeholder">
                {/* Placeholder for designer image */}
              </div>
              <h3>{designer.name}</h3>
              <p>{designer.description}</p>
              <button className="shop-now-link">shop now →</button>
            </div>
          ))}
        </div>
      </section>

      {/* Instagram Section */}
      <section className="instagram-section container">
        <h2 className="section-title">Shop our Instagram</h2>
        <p className="section-subtitle">Follow us on Instagram for exciting content</p>
        <div className="instagram-grid">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="instagram-item">
              <div className="instagram-placeholder"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Store Locations */}
      <section className="stores-section container">
        <h2 className="section-title">VISIT OUR STORE!</h2>
        <div className="stores-grid">
          <div className="store-card">
            <div className="store-image-placeholder"></div>
            <h3>TIRUPPUR</h3>
            <p>Address: [Your Address]</p>
            <p>Landmark: [Landmark]</p>
            <p>Phone: +91 XXXXX XXXXX</p>
            <button className="btn-primary">Find a store →</button>
          </div>
          <div className="store-card">
            <h3>OTHER LOCATIONS</h3>
            <p>Coming Soon...</p>
          </div>
        </div>
      </section>

      {/* Restocked Section */}
      {recentProducts.length > 0 && (
        <section className="products-section container">
          <h2 className="section-title">Restocked</h2>
          <div className="products-grid">
            {recentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <section className="products-section container">
          <h2 className="section-title">BEST SELLER!</h2>
          <p className="section-subtitle">
            Viral, loved, and most-selling: Discover our top picks before they're gone
          </p>
          <div className="products-grid">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="view-all-container">
            <button className="btn-primary">View all</button>
          </div>
        </section>
      )}

      {/* Fashion Mood */}
      <section className="fashion-mood-section container">
        <h2 className="section-title">What's Your Fashion Mood?</h2>
        <div className="mood-grid">
          <div className="mood-item">
            <div className="mood-placeholder"></div>
            <p>Halfearee »</p>
          </div>
          <div className="mood-item">
            <div className="mood-placeholder"></div>
            <p>Kurti Set SKcs »</p>
          </div>
          <div className="mood-item">
            <div className="mood-placeholder"></div>
            <p>Anarkali, Ethnic maxi »</p>
          </div>
          <div className="mood-item">
            <div className="mood-placeholder"></div>
            <p>Skirt and Top »</p>
          </div>
        </div>
        <div className="view-all-container">
          <button className="btn-primary">View all</button>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
