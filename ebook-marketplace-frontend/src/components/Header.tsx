import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          Ebook Marketplace
        </Link>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link">
                Carrinho
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link">
                Perfil
              </Link>
            </li>
          </ul>
        </nav>
        <div className="auth-buttons">
          <Link to="/login" className="auth-button">
            Login
          </Link>
          <Link to="/register" className="auth-button register">
            Registrar
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header; 