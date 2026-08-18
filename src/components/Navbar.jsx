import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

import logoImg from '../assets/new_logo.png';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { currentUser, logout } = useAuth();

  const totalCount = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = async () => {
    try {
      await logout();
      closeMenu();
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar-container">
      {/* Logo & Brand */}
      <Link to="/" className="logo" onClick={closeMenu}>
        <img src={logoImg} alt="Graceful Flowers Logo" />
        <span>Graceful Flowers</span>
      </Link>

      {/* Hamburger Button (Mobile) */}
      <button className="hamburger-btn" onClick={toggleMenu} aria-label="Toggle menu">
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Desktop Menu */}
      <div className="desktop-menu">
        <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
        <Link to="/about" className="nav-link" onClick={closeMenu}>About Us</Link>
        <Link to="/products" className="nav-link" onClick={closeMenu}>Products</Link>
        <Link to="/dashboard" className="nav-link" onClick={closeMenu}>Dashboard</Link>
        <Link to="/contact" className="nav-link" onClick={closeMenu}>Contact Us</Link>
        <Link to="/cart" className="nav-link" onClick={closeMenu}>
          Cart 🛒 {totalCount > 0 && `(${totalCount})`}
        </Link>

        {currentUser ? (
          <>
            <Link to="/profile" className="nav-link" onClick={closeMenu}>
              👤 {currentUser.username || currentUser.email?.split('@')[0]}
            </Link>
            <button 
              onClick={handleLogout} 
              className="nav-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link" onClick={closeMenu}>Login</Link>
            <Link to="/register" className="nav-link register-btn" onClick={closeMenu}>Register</Link>
          </>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="mobile-dropdown">
          <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
          <Link to="/about" className="nav-link" onClick={closeMenu}>About Us</Link>
          <Link to="/products" className="nav-link" onClick={closeMenu}>Products</Link>
          <Link to="/dashboard" className="nav-link" onClick={closeMenu}>Dashboard</Link>
          <Link to="/contact" className="nav-link" onClick={closeMenu}>Contact Us</Link>
          <Link to="/cart" className="nav-link" onClick={closeMenu}>
            Cart 🛒 {totalCount > 0 && `(${totalCount})`}
          </Link>

          {currentUser ? (
            <>
              <Link to="/profile" className="nav-link" onClick={closeMenu}>
                👤 {currentUser.username || currentUser.email?.split('@')[0]}
              </Link>
              <button 
                onClick={handleLogout} 
                className="nav-link"
                style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%' }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" onClick={closeMenu}>Login</Link>
              <Link to="/register" className="nav-link register-btn" onClick={closeMenu}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}