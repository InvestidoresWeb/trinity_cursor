import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface CartItem {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        // TODO: Implementar chamada à API para buscar itens do carrinho
        // const response = await api.get('/cart');
        // setCartItems(response.data);
        setCartItems([
          {
            id: '1',
            title: 'Livro 1',
            author: 'Autor 1',
            price: 29.99,
            coverImage: 'https://via.placeholder.com/150',
            quantity: 1,
          },
          {
            id: '2',
            title: 'Livro 2',
            author: 'Autor 2',
            price: 39.99,
            coverImage: 'https://via.placeholder.com/150',
            quantity: 2,
          },
        ]);
      } catch (err) {
        setError('Erro ao carregar carrinho');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    // TODO: Implementar chamada à API para atualizar quantidade
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    // TODO: Implementar chamada à API para remover item
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h1>Carrinho Vazio</h1>
        <p>Seu carrinho está vazio. Adicione alguns livros!</p>
        <Link to="/dashboard" className="continue-shopping">
          Continuar Comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h1 className="cart-title">Carrinho de Compras</h1>
      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.coverImage}
                alt={item.title}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3 className="cart-item-title">{item.title}</h3>
                <p className="cart-item-author">{item.author}</p>
                <p className="cart-item-price">
                  R$ {item.price.toFixed(2)}
                </p>
                <div className="cart-item-quantity">
                  <label htmlFor={`quantity-${item.id}`}>
                    Quantidade:
                  </label>
                  <input
                    type="number"
                    id={`quantity-${item.id}`}
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleUpdateQuantity(
                        item.id,
                        Number(e.target.value)
                      )
                    }
                  />
                </div>
                <button
                  className="remove-item"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>Resumo do Pedido</h2>
          <div className="summary-item">
            <span>Subtotal:</span>
            <span>R$ {calculateTotal().toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Frete:</span>
            <span>Grátis</span>
          </div>
          <div className="summary-item total">
            <span>Total:</span>
            <span>R$ {calculateTotal().toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="checkout-button">
            Finalizar Compra
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart; 