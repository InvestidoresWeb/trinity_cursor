import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">Ebook Marketplace</h3>
          <p className="footer-description">
            Sua plataforma para comprar e vender ebooks.
          </p>
        </div>
        <div className="footer-section">
          <h3 className="footer-title">Links Úteis</h3>
          <ul className="footer-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/cart">Carrinho</Link>
            </li>
            <li>
              <Link to="/profile">Perfil</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-title">Contato</h3>
          <ul className="footer-links">
            <li>
              <a href="mailto:contato@ebookmarketplace.com">
                contato@ebookmarketplace.com
              </a>
            </li>
            <li>
              <a href="tel:+5511999999999">(11) 99999-9999</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="copyright">
          &copy; {new Date().getFullYear()} Ebook Marketplace. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer; 