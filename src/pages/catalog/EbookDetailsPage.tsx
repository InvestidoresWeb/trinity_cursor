import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  Box,
  Chip,
  Divider,
  CircularProgress,
  Paper,
  Rating,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import MainLayout from '../../components/layout/MainLayout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import MenuBookIcon from '@mui/icons-material/MenuBook';

interface Ebook {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  coverUrl: string;
  category: string;
  rating: number;
  totalReviews: number;
  pages: number;
  language: string;
  publisher: string;
  publishDate: string;
  isbn: string;
}

const EbookDetailsPage: React.FC = () => {
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [ebook, setEbook] = useState<Ebook | null>(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchEbookDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/ebooks/${id}`);
        setEbook(response.data);
      } catch (error) {
        console.error('Erro ao carregar detalhes do e-book:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEbookDetails();
  }, [id]);

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      setOpenDialog(true);
      return;
    }

    try {
      const response = await api.post('/purchases', { ebookId: id });
      window.location.href = response.data.paymentUrl;
    } catch (error) {
      console.error('Erro ao processar compra:', error);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      </MainLayout>
    );
  }

  if (!ebook) {
    return (
      <MainLayout>
        <Container>
          <Typography variant="h5" color="error" align="center">
            E-book não encontrado
          </Typography>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container>
        <Grid container spacing={4}>
          {/* Coluna da Esquerda - Capa e Informações de Compra */}
          <Grid item xs={12} md={4}>
            <Card 
              elevation={3}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'sticky',
                top: theme.spacing(2),
              }}
            >
              <CardMedia
                component="img"
                image={ebook.coverUrl}
                alt={ebook.title}
                sx={{
                  height: 400,
                  objectFit: 'cover',
                }}
              />
              <Box p={2}>
                <Typography variant="h4" color="primary" gutterBottom align="center">
                  R$ {ebook.price.toFixed(2)}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  startIcon={<ShoppingCartIcon />}
                  onClick={handlePurchase}
                  sx={{ mb: 2 }}
                >
                  Comprar Agora
                </Button>
                <Divider sx={{ my: 2 }} />
                <Box display="flex" alignItems="center" mb={1}>
                  <MenuBookIcon sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    {ebook.pages} páginas
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <LocalOfferIcon sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Entrega digital imediata
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>

          {/* Coluna da Direita - Detalhes do E-book */}
          <Grid item xs={12} md={8}>
            <Typography variant="h4" component="h1" gutterBottom>
              {ebook.title}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              por {ebook.author}
            </Typography>

            <Box display="flex" alignItems="center" mb={2}>
              <Rating value={ebook.rating} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({ebook.totalReviews} avaliações)
              </Typography>
            </Box>

            <Chip 
              label={ebook.category}
              color="primary"
              variant="outlined"
              sx={{ mb: 3 }}
            />

            <Typography variant="h6" gutterBottom>
              Sobre este e-book
            </Typography>
            <Typography variant="body1" paragraph>
              {ebook.description}
            </Typography>

            <Paper elevation={0} sx={{ bgcolor: 'grey.50', p: 3, mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Detalhes do Produto
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Editora
                  </Typography>
                  <Typography variant="body1">
                    {ebook.publisher}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Data de Publicação
                  </Typography>
                  <Typography variant="body1">
                    {new Date(ebook.publishDate).toLocaleDateString('pt-BR')}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Idioma
                  </Typography>
                  <Typography variant="body1">
                    {ebook.language}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    ISBN
                  </Typography>
                  <Typography variant="body1">
                    {ebook.isbn}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {/* Diálogo de Login */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
        >
          <DialogTitle>
            Faça login para continuar
          </DialogTitle>
          <DialogContent>
            <Typography>
              Para comprar este e-book, você precisa estar logado na plataforma.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>
              Cancelar
            </Button>
            <Button 
              variant="contained" 
              onClick={() => navigate('/login')}
            >
              Fazer Login
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </MainLayout>
  );
};

export default EbookDetailsPage; 