import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider } from './context/AuthContext'; // ថែម Import AuthProvider
import Navbar from './components/Navbar';

import logoImg from './assets/new_logo.png';

import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';

import './App.css';

function Navigation() {
  const location = useLocation();
  const { cartItems } = useCart();
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // State សម្រាប់ បើក/បិទ Menu លើ Mobile
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="nav_bar">
      <div className="nav_header">
        <Link to="/" className="nav_brand" onClick={closeMenu}>
          <img 
            src={logoImg} 
            alt="Graceful Flowers Logo" 
            className="navbar_logo"
          />
          <h1 className="brand_title">
            Graceful Flowers
          </h1>
        </Link>

        {/* ប៊ូតុងត្រេ៣ (Hamburger Button) */}
        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Menu Links */}
      <ul className={`menu_link ${isOpen ? 'active' : ''}`}>
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeMenu}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={closeMenu}>
            About Us
          </Link>
        </li>
        <li>
          <Link to="/products" className={location.pathname === '/products' ? 'active' : ''} onClick={closeMenu}>
            Products
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''} onClick={closeMenu}>
            Contact Us
          </Link>
        </li>
        <li>
          <Link to="/cart" className={location.pathname === '/cart' ? 'active' : ''} onClick={closeMenu}>
            Cart 🛒 {totalCount > 0 && <span className="cart_badge">{totalCount}</span>}
          </Link>
        </li>
        <li>
          <Link to="/login" className={location.pathname === '/login' ? 'active' : ''} onClick={closeMenu}>
            Login
          </Link>
        </li>
        <li>
          <Link to="/register" className={location.pathname === '/register' ? 'active' : ''} onClick={closeMenu}>
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <main className="main_content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </main>
            <footer>
              <p>© 2026 Graceful Flowers. All Rights Reserved.</p>
            </footer>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}