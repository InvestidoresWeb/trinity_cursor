import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Paper,
  Typography,
  Button,
  Divider,
} from '@mui/material';

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  coverImage: string;
  category: string;
  pages: number;
  language: string;
  format: string;
}

const EbookDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        // TODO: Implementar chamada à API para buscar livro
        const mockBook: Book = {
          id: id || '1',
          title: 'Livro Exemplo',
          author: 'Autor Exemplo',
          description: 'Uma descrição detalhada do livro...',
          price: 29.99,
          coverImage: 'https://via.placeholder.com/300',
          category: 'ficcao',
          pages: 200,
          language: 'Português',
          format: 'PDF',
        };
        setBook(mockBook);
      } catch (err) {
        setError('Erro ao carregar livro');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleBuy = () => {
    navigate('/checkout');
  };

  if (loading) {
    return (
      <Container>
        <Typography>Carregando...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  if (!book) {
    return (
      <Container>
        <Typography>Livro não encontrado</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          <Box sx={{ width: { xs: '100%', md: '33%' } }}>
            <Paper elevation={3}>
              <Box
                component="img"
                src={book.coverImage}
                alt={book.title}
                sx={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                }}
              />
            </Paper>
          </Box>

          <Box sx={{ width: { xs: '100%', md: '67%' } }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {book.title}
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
              {book.author}
            </Typography>

            <Typography variant="h5" color="primary" gutterBottom>
              R$ {book.price.toFixed(2)}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleBuy}
              sx={{ mb: 3 }}
            >
              Comprar Agora
            </Button>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Descrição
            </Typography>
            <Typography paragraph>
              {book.description}
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ width: { xs: '100%', sm: '45%' } }}>
                <Typography variant="subtitle1">
                  <strong>Páginas:</strong> {book.pages}
                </Typography>
              </Box>
              <Box sx={{ width: { xs: '100%', sm: '45%' } }}>
                <Typography variant="subtitle1">
                  <strong>Idioma:</strong> {book.language}
                </Typography>
              </Box>
              <Box sx={{ width: { xs: '100%', sm: '45%' } }}>
                <Typography variant="subtitle1">
                  <strong>Formato:</strong> {book.format}
                </Typography>
              </Box>
              <Box sx={{ width: { xs: '100%', sm: '45%' } }}>
                <Typography variant="subtitle1">
                  <strong>Categoria:</strong> {book.category}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default EbookDetailsPage; 