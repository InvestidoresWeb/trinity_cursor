import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Bem-vindo ao Ebook Marketplace
          </h1>
          <p className="hero-description">
            Encontre os melhores ebooks e comece a ler hoje mesmo.
          </p>
          <Link to="/dashboard" className="hero-button">
            Explorar Ebooks
          </Link>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">Recursos</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3 className="feature-title">Grande Variedade</h3>
            <p className="feature-description">
              Acesso a milhares de ebooks em diferentes categorias.
            </p>
          </div>
          <div className="feature-card">
            <h3 className="feature-title">Preços Acessíveis</h3>
            <p className="feature-description">
              Ebooks com preços competitivos e promoções especiais.
            </p>
          </div>
          <div className="feature-card">
            <h3 className="feature-title">Leitura Instantânea</h3>
            <p className="feature-description">
              Comece a ler seus ebooks imediatamente após a compra.
            </p>
          </div>
        </div>
      </section>

      <section className="categories">
        <h2 className="section-title">Categorias Populares</h2>
        <div className="categories-grid">
          <Link to="/dashboard?category=ficcao" className="category-card">
            <h3 className="category-title">Ficção</h3>
          </Link>
          <Link to="/dashboard?category=nao-ficcao" className="category-card">
            <h3 className="category-title">Não Ficção</h3>
          </Link>
          <Link to="/dashboard?category=tecnologia" className="category-card">
            <h3 className="category-title">Tecnologia</h3>
          </Link>
          <Link to="/dashboard?category=negocios" className="category-card">
            <h3 className="category-title">Negócios</h3>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 