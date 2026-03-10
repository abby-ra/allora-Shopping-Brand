import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram } from 'react-icons/fi';
import './Footer.css';

function Footer() {
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Quick links</h3>
          <ul>
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/collection/all">COLLECTION</Link></li>
            <li><Link to="/collection/immediate-dispatch">IMMEDIATE DISPATCH</Link></li>
            <li><Link to="/collection/exclusive-drops">EXCLUSIVE DROPS</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Info</h3>
          <ul>
            <li><Link to="/contact">Contact us</Link></li>
            <li><Link to="/terms">Term of services</Link></li>
            <li><Link to="/returns">Return and Refund Policy</Link></li>
            <li><Link to="/shipping">Shipping policy</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Our mission</h3>
          <p>We are passionate and enthusiastic about making sure you have the right product for your needs.</p>
        </div>
      </div>

      <div className="footer-subscribe">
        <h3>Subscribe to our emails</h3>
        <form onSubmit={handleSubscribe}>
          <input type="email" placeholder="Email" required />
          <button type="submit">→</button>
        </form>
      </div>

      <div className="footer-social">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FiInstagram size={28} />
        </a>
      </div>

      <div className="footer-bottom">
        <p>© 2026, Allora | Powered by Shopify</p>
      </div>
    </footer>
  );
}

export default Footer;
