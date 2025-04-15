import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Páginas públicas
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import CatalogPage from '../pages/catalog/CatalogPage';
import EbookDetailsPage from '../pages/catalog/EbookDetailsPage';

// Páginas protegidas - Cliente
import CustomerDashboard from '../pages/customer/CustomerDashboard';
import CustomerLibrary from '../pages/customer/CustomerLibrary';
import CustomerProfile from '../pages/customer/CustomerProfile';

// Páginas protegidas - Revendedor
import ResellerDashboard from '../pages/reseller/ResellerDashboard';
import ResellerInventory from '../pages/reseller/ResellerInventory';
import ResellerProfile from '../pages/reseller/ResellerProfile';

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedUserTypes?: ('customer' | 'reseller')[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedUserTypes }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedUserTypes && user && !allowedUserTypes.includes(user.type)) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<Navigate to="/catalog" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/ebook/:id" element={<EbookDetailsPage />} />

      {/* Rotas do Cliente */}
      <Route
        path="/customer/dashboard"
        element={
          <PrivateRoute allowedUserTypes={['customer']}>
            <CustomerDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/customer/library"
        element={
          <PrivateRoute allowedUserTypes={['customer']}>
            <CustomerLibrary />
          </PrivateRoute>
        }
      />
      <Route
        path="/customer/profile"
        element={
          <PrivateRoute allowedUserTypes={['customer']}>
            <CustomerProfile />
          </PrivateRoute>
        }
      />

      {/* Rotas do Revendedor */}
      <Route
        path="/reseller/dashboard"
        element={
          <PrivateRoute allowedUserTypes={['reseller']}>
            <ResellerDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/reseller/inventory"
        element={
          <PrivateRoute allowedUserTypes={['reseller']}>
            <ResellerInventory />
          </PrivateRoute>
        }
      />
      <Route
        path="/reseller/profile"
        element={
          <PrivateRoute allowedUserTypes={['reseller']}>
            <ResellerProfile />
          </PrivateRoute>
        }
      />

      {/* Rota 404 */}
      <Route path="*" element={<Navigate to="/catalog" />} />
    </Routes>
  );
};

export default AppRoutes; 