import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAuth } from '../contexts/AuthContext';

interface PaymentData {
  orderId: string;
  amount: number;
  date: string;
  items: Array<{
    title: string;
    price: number;
  }>;
}

const Success: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

  useEffect(() => {
    // Simulando dados do pagamento (em produção, isso viria da API)
    setPaymentData({
      orderId: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      amount: 99.99,
      date: new Date().toLocaleDateString('pt-BR'),
      items: [
        { title: 'Ebook 1', price: 49.99 },
        { title: 'Ebook 2', price: 50.00 }
      ]
    });

    // Redireciona para o painel após 10 segundos
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <CheckCircleIcon
            color="success"
            sx={{ fontSize: 60 }}
          />
          
          <Typography variant="h4" component="h1" gutterBottom>
            Compra Realizada com Sucesso!
          </Typography>
          
          <Typography variant="body1" color="text.secondary" paragraph>
            Obrigado por sua compra! Seus ebooks já estão disponíveis em sua biblioteca.
          </Typography>

          {paymentData && (
            <TableContainer component={Paper} sx={{ mt: 2, width: '100%' }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell><strong>Número do Pedido</strong></TableCell>
                    <TableCell>{paymentData.orderId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Data da Compra</strong></TableCell>
                    <TableCell>{paymentData.date}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Itens Comprados</strong></TableCell>
                    <TableCell>
                      {paymentData.items.map((item, index) => (
                        <div key={index}>
                          {item.title} - R$ {item.price.toFixed(2)}
                        </div>
                      ))}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Total Pago</strong></TableCell>
                    <TableCell>R$ {paymentData.amount.toFixed(2)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
          
          <Typography variant="body2" color="text.secondary" paragraph>
            Você será redirecionado para seu painel em 10 segundos...
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/dashboard')}
            >
              Ir para o Painel
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => window.print()}
            >
              Imprimir Comprovante
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Success; 