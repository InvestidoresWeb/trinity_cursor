import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from '@mui/material';
import api from '../services/api';

interface Ebook {
  id: number;
  title: string;
  author: string;
  price: number;
  description: string;
}

const Home: React.FC = () => {
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        const response = await api.get('/ebooks');
        setEbooks(response.data);
      } catch (error) {
        console.error('Erro ao buscar e-books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEbooks();
  }, []);

  if (loading) {
    return (
      <Container>
        <Typography>Carregando...</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          E-books Disponíveis
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {ebooks.map((ebook) => (
          <Grid item xs={12} sm={6} md={4} key={ebook.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {ebook.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Autor: {ebook.author}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {ebook.description}
                </Typography>
                <Typography variant="h6" color="primary">
                  R$ {ebook.price.toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Comprar
                </Button>
                <Button size="small" color="primary">
                  Detalhes
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home; 