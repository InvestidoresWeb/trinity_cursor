import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  TextField,
  MenuItem,
  Container,
  Pagination,
  CircularProgress,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import MainLayout from '../../components/layout/MainLayout';

interface Ebook {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  coverUrl: string;
  category: string;
}

const CatalogPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('title');

  const categories = [
    { value: 'all', label: 'Todas Categorias' },
    { value: 'fiction', label: 'Ficção' },
    { value: 'non-fiction', label: 'Não Ficção' },
    { value: 'business', label: 'Negócios' },
    { value: 'technology', label: 'Tecnologia' },
  ];

  const sortOptions = [
    { value: 'title', label: 'Título (A-Z)' },
    { value: 'price_asc', label: 'Preço (Menor-Maior)' },
    { value: 'price_desc', label: 'Preço (Maior-Menor)' },
    { value: 'newest', label: 'Mais Recentes' },
  ];

  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        setLoading(true);
        const response = await api.get('/ebooks', {
          params: {
            page,
            category: category !== 'all' ? category : undefined,
            search,
            sortBy,
          },
        });
        setEbooks(response.data.ebooks);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Erro ao carregar e-books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEbooks();
  }, [page, category, search, sortBy]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  return (
    <MainLayout>
      <Container>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Catálogo de E-books
          </Typography>

          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Buscar e-books"
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3} md={4}>
              <TextField
                select
                fullWidth
                label="Categoria"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                variant="outlined"
              >
                {categories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3} md={4}>
              <TextField
                select
                fullWidth
                label="Ordenar por"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                variant="outlined"
              >
                {sortOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          {loading ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Grid container spacing={3}>
                {ebooks.map((ebook) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={ebook.id}>
                    <Card 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.02)',
                          boxShadow: theme.shadows[4],
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={ebook.coverUrl}
                        alt={ebook.title}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h6" component="h2" noWrap>
                          {ebook.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {ebook.author}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          sx={{ 
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            mb: 2
                          }}
                        >
                          {ebook.description}
                        </Typography>
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mt: 'auto'
                          }}
                        >
                          <Typography variant="h6" color="primary">
                            R$ {ebook.price.toFixed(2)}
                          </Typography>
                          <Button 
                            variant="contained" 
                            size="small"
                            onClick={() => navigate(`/ebook/${ebook.id}`)}
                          >
                            Detalhes
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                />
              </Box>
            </>
          )}
        </Box>
      </Container>
    </MainLayout>
  );
};

export default CatalogPage; 