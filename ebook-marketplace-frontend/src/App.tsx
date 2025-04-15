import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

// Páginas
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CatalogPage from './pages/catalog/CatalogPage';
import EbookDetailsPage from './pages/catalog/EbookDetailsPage';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/ebook/:id" element={<EbookDetailsPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App; 