import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  category: string;
}

const CatalogPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        // TODO: Implementar chamada à API para buscar livros
        const mockBooks: Book[] = [
          {
            id: '1',
            title: 'Livro 1',
            author: 'Autor 1',
            price: 29.99,
            coverImage: 'https://via.placeholder.com/150',
            category: 'ficcao',
          },
          {
            id: '2',
            title: 'Livro 2',
            author: 'Autor 2',
            price: 39.99,
            coverImage: 'https://via.placeholder.com/150',
            category: 'nao-ficcao',
          },
        ];
        setBooks(mockBooks);
      } catch (err) {
        setError('Erro ao carregar livros');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchParams]);

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !category || book.category === category;
    return matchesSearch && matchesCategory;
  });

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

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Catálogo de Ebooks
        </Typography>

        <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
          <TextField
            label="Buscar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
          />

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Categoria</InputLabel>
            <Select
              value={category}
              label="Categoria"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="">Todas</MenuItem>
              <MenuItem value="ficcao">Ficção</MenuItem>
              <MenuItem value="nao-ficcao">Não Ficção</MenuItem>
              <MenuItem value="tecnologia">Tecnologia</MenuItem>
              <MenuItem value="negocios">Negócios</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={3}>
          {filteredBooks.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.id} component="div">
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={book.coverImage}
                  alt={book.title}
                />
                <CardContent>
                  <Typography variant="h6" component="h2">
                    {book.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {book.author}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    R$ {book.price.toFixed(2)}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Comprar
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default CatalogPage; 