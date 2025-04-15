import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Páginas públicas
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import CatalogPage from '../pages/catalog/CatalogPage';
import EbookDetailsPage from '../pages/catalog/EbookDetailsPage';
import Success from '../pages/Success';
import Dashboard from '../pages/Dashboard';

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<Navigate to="/catalog" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/ebook/:id" element={<EbookDetailsPage />} />
      <Route path="/success" element={<Success />} />

      {/* Rotas Protegidas */}
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default AppRoutes; 