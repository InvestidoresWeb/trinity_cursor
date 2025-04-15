import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  description: string;
  category: string;
  pages: number;
  language: string;
  publisher: string;
  publicationDate: string;
}

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        // TODO: Implementar chamada à API para buscar detalhes do livro
        // const response = await api.get(`/books/${id}`);
        // setBook(response.data);
        setBook({
          id: '1',
          title: 'Livro 1',
          author: 'Autor 1',
          price: 29.99,
          coverImage: 'https://via.placeholder.com/300',
          description:
            'Descrição detalhada do livro. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          category: 'ficcao',
          pages: 200,
          language: 'Português',
          publisher: 'Editora XYZ',
          publicationDate: '2023-01-01',
        });
      } catch (err) {
        setError('Erro ao carregar detalhes do livro');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleAddToCart = () => {
    // TODO: Implementar lógica para adicionar ao carrinho
    console.log('Adicionar ao carrinho:', { book, quantity });
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!book) {
    return <div className="error">Livro não encontrado</div>;
  }

  return (
    <div className="book-details">
      <div className="book-details-container">
        <div className="book-cover">
          <img src={book.coverImage} alt={book.title} />
        </div>
        <div className="book-info">
          <h1 className="book-title">{book.title}</h1>
          <p className="book-author">por {book.author}</p>
          <p className="book-price">R$ {book.price.toFixed(2)}</p>
          <div className="book-meta">
            <p>
              <strong>Categoria:</strong> {book.category}
            </p>
            <p>
              <strong>Páginas:</strong> {book.pages}
            </p>
            <p>
              <strong>Idioma:</strong> {book.language}
            </p>
            <p>
              <strong>Editora:</strong> {book.publisher}
            </p>
            <p>
              <strong>Data de Publicação:</strong>{' '}
              {new Date(book.publicationDate).toLocaleDateString()}
            </p>
          </div>
          <div className="book-description">
            <h2>Descrição</h2>
            <p>{book.description}</p>
          </div>
          <div className="book-actions">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantidade:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>
            <button className="add-to-cart" onClick={handleAddToCart}>
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails; 