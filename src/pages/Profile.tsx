import React, { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

interface Purchase {
  id: number;
  ebook_id: number;
  purchase_date: string;
  price: number;
  ebook: {
    title: string;
    author: string;
  };
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await api.get(`/users/${user?.id}/purchases`);
        setPurchases(response.data);
      } catch (error) {
        console.error('Erro ao buscar compras:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPurchases();
    }
  }, [user]);

  if (!user) {
    return (
      <Container>
        <Typography>Você precisa estar logado para ver seu perfil.</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Meu Perfil
          </Typography>
          <Typography variant="h6" gutterBottom>
            Nome: {user.name}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Email: {user.email}
          </Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Minhas Compras
        </Typography>
        {loading ? (
          <Typography>Carregando...</Typography>
        ) : purchases.length === 0 ? (
          <Typography>Você ainda não fez nenhuma compra.</Typography>
        ) : (
          <List>
            {purchases.map((purchase) => (
              <React.Fragment key={purchase.id}>
                <ListItem>
                  <ListItemText
                    primary={purchase.ebook.title}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          Autor: {purchase.ebook.author}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2">
                          Data: {new Date(purchase.purchase_date).toLocaleDateString()}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2">
                          Preço: R$ {purchase.price.toFixed(2)}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
};

export default Profile; 