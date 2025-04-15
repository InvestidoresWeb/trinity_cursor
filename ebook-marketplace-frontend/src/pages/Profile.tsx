import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  items: {
    title: string;
    quantity: number;
    price: number;
  }[];
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'info' | 'orders'>('info');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // TODO: Implementar chamada à API para buscar dados do usuário
        // const userResponse = await api.get('/user/profile');
        // const ordersResponse = await api.get('/user/orders');
        // setUser(userResponse.data);
        // setOrders(ordersResponse.data);
        setUser({
          id: '1',
          name: 'Usuário Teste',
          email: 'usuario@teste.com',
          phone: '(11) 99999-9999',
          address: {
            street: 'Rua Teste',
            number: '123',
            complement: 'Apto 45',
            neighborhood: 'Bairro Teste',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01234-567',
          },
        });
        setOrders([
          {
            id: '1',
            date: '2023-01-01',
            total: 99.98,
            status: 'Entregue',
            items: [
              {
                title: 'Livro 1',
                quantity: 1,
                price: 29.99,
              },
              {
                title: 'Livro 2',
                quantity: 2,
                price: 34.99,
              },
            ],
          },
        ]);
      } catch (err) {
        setError('Erro ao carregar dados do usuário');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const [section, field] = name.split('.');

    setUser((prev) => ({
      ...prev!,
      [section]: {
        ...prev![section as keyof User],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // TODO: Implementar chamada à API para atualizar dados do usuário
      // await api.put('/user/profile', user);
      alert('Dados atualizados com sucesso!');
    } catch (err) {
      setError('Erro ao atualizar dados');
    }
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!user) {
    return <div className="error">Usuário não encontrado</div>;
  }

  return (
    <div className="profile">
      <div className="profile-tabs">
        <button
          className={`tab-button ${
            activeTab === 'info' ? 'active' : ''
          }`}
          onClick={() => setActiveTab('info')}
        >
          Informações Pessoais
        </button>
        <button
          className={`tab-button ${
            activeTab === 'orders' ? 'active' : ''
          }`}
          onClick={() => setActiveTab('orders')}
        >
          Meus Pedidos
        </button>
      </div>

      {activeTab === 'info' && (
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Informações Pessoais</h2>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Telefone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={user.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Endereço</h2>
            <div className="form-group">
              <label htmlFor="address.street">Rua</label>
              <input
                type="text"
                id="address.street"
                name="address.street"
                value={user.address.street}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="address.number">Número</label>
                <input
                  type="text"
                  id="address.number"
                  name="address.number"
                  value={user.address.number}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address.complement">
                  Complemento
                </label>
                <input
                  type="text"
                  id="address.complement"
                  name="address.complement"
                  value={user.address.complement}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="address.neighborhood">
                Bairro
              </label>
              <input
                type="text"
                id="address.neighborhood"
                name="address.neighborhood"
                value={user.address.neighborhood}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="address.city">Cidade</label>
                <input
                  type="text"
                  id="address.city"
                  name="address.city"
                  value={user.address.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address.state">Estado</label>
                <input
                  type="text"
                  id="address.state"
                  name="address.state"
                  value={user.address.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address.zipCode">CEP</label>
                <input
                  type="text"
                  id="address.zipCode"
                  name="address.zipCode"
                  value={user.address.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <button type="submit" className="save-button">
            Salvar Alterações
          </button>
        </form>
      )}

      {activeTab === 'orders' && (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <span className="order-id">
                    Pedido #{order.id}
                  </span>
                  <span className="order-date">
                    {new Date(order.date).toLocaleDateString()}
                  </span>
                </div>
                <span className={`order-status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>
              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <span className="item-title">
                      {item.title} x {item.quantity}
                    </span>
                    <span className="item-price">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="order-total">
                <span>Total</span>
                <span>R$ {order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile; 