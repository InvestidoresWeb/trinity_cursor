import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <div className="not-found-container">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Página Não Encontrada</h2>
        <p className="not-found-description">
          Desculpe, a página que você está procurando não existe.
        </p>
        <Link to="/" className="not-found-button">
          Voltar para a Página Inicial
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 