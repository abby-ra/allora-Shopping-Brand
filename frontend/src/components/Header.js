import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import './Header.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>ALLORA</h1>
        </Link>
        
        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>HOME</Link>
          <Link to="/collection/all" onClick={() => setMenuOpen(false)}>COLLECTION</Link>
          <Link to="/collection/immediate-dispatch" onClick={() => setMenuOpen(false)}>IMMEDIATE DISPATCH</Link>
          <Link to="/collection/exclusive-drops" onClick={() => setMenuOpen(false)}>EXCLUSIVE DROPS</Link>
        </nav>

        <div className="header-actions">
          <button className="icon-btn" aria-label="Search">
            <FiSearch size={22} />
          </button>
          <button className="icon-btn" aria-label="Account">
            <FiUser size={22} />
          </button>
          <button className="icon-btn cart-btn" aria-label="Cart">
            <FiShoppingCart size={22} />
            <span className="cart-count">0</span>
          </button>
          <button 
            className="icon-btn mobile-menu-btn" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
