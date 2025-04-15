import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // TODO: Implementar chamada à API de autenticação
      // const response = await api.post('/auth/login', { email, password });
      // localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Email ou senha inválidos');
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <h1 className="login-title">Login</h1>
        {error && <div className="alert alert-error">{error}</div>}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>
        <div className="login-links">
          <Link to="/forgot-password">Esqueceu a senha?</Link>
          <p>
            Não tem uma conta? <Link to="/register">Registre-se</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 