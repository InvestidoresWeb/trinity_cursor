import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Card,
  CardContent,
  useTheme,
  Chip,
  LinearProgress,
  Tooltip,
} from '@mui/material';
import {
  TrendingUp,
  Inventory,
  LocalAtm,
  EmojiEvents,
  People,
  Assessment,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import MainLayout from '../../components/layout/MainLayout';

interface SalesMetrics {
  totalSales: number;
  monthlyRevenue: number;
  totalEarnings: number;
  currentStock: number;
  queuePosition: number;
  level: {
    name: string;
    progress: number;
    nextLevel: string;
    remainingSales: number;
  };
}

interface Transaction {
  id: string;
  date: string;
  type: 'sale' | 'purchase';
  amount: number;
  customerName?: string;
  ebookTitle: string;
  status: 'completed' | 'pending' | 'failed';
}

const ResellerDashboard: React.FC = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<SalesMetrics | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [metricsResponse, transactionsResponse] = await Promise.all([
          api.get('/reseller/metrics'),
          api.get('/reseller/transactions'),
        ]);
        setMetrics(metricsResponse.data);
        setTransactions(transactionsResponse.data);
      } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleBuyStock = async () => {
    try {
      const response = await api.post('/reseller/purchase-stock');
      window.location.href = response.data.paymentUrl;
    } catch (error) {
      console.error('Erro ao comprar estoque:', error);
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

  return (
    <MainLayout>
      <Container>
        <Box mb={4}>
          <Typography variant="h4" gutterBottom>
            Painel do Revendedor
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Bem-vindo(a), {user?.name}!
          </Typography>
        </Box>

        {/* Cards de Métricas */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <TrendingUp color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Vendas Totais</Typography>
                </Box>
                <Typography variant="h4" color="primary">
                  {metrics?.totalSales}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  vendas realizadas
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <LocalAtm color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Receita Mensal</Typography>
                </Box>
                <Typography variant="h4" color="primary">
                  R$ {metrics?.monthlyRevenue.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  no mês atual
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Inventory color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Estoque Atual</Typography>
                </Box>
                <Typography variant="h4" color="primary">
                  {metrics?.currentStock}
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                  <Typography variant="body2" color="text.secondary">
                    e-books disponíveis
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleBuyStock}
                    disabled={metrics?.currentStock === 0}
                  >
                    Comprar Lote
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Status do Revendedor */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <EmojiEvents color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">Status do Revendedor</Typography>
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box mb={2}>
                <Typography variant="subtitle1" gutterBottom>
                  Nível Atual
                </Typography>
                <Box display="flex" alignItems="center">
                  <Chip 
                    label={metrics?.level.name}
                    color="primary"
                    sx={{ mr: 2 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Próximo nível: {metrics?.level.nextLevel}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">
                    Progresso para o próximo nível
                  </Typography>
                  <Typography variant="body2" color="primary">
                    {metrics?.level.progress}%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={metrics?.level.progress} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Faltam {metrics?.level.remainingSales} vendas para o próximo nível
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box mb={2}>
                <Typography variant="subtitle1" gutterBottom>
                  Posição na Fila
                </Typography>
                <Box display="flex" alignItems="center">
                  <People color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h4" color="primary">
                    #{metrics?.queuePosition}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Sua posição atual na fila de revendedores
              </Typography>
            </Box>
          </Grid>
        </Paper>

        {/* Histórico de Transações */}
        <Paper sx={{ p: 3 }}>
          <Box display="flex" alignItems="center" mb={3}>
            <Assessment color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">Histórico de Transações</Typography>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Data</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>E-book</TableCell>
                  <TableCell>Cliente</TableCell>
                  <TableCell align="right">Valor</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {new Date(transaction.date).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={transaction.type === 'sale' ? 'Venda' : 'Compra'}
                        color={transaction.type === 'sale' ? 'success' : 'primary'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{transaction.ebookTitle}</TableCell>
                    <TableCell>{transaction.customerName || '-'}</TableCell>
                    <TableCell align="right">
                      R$ {transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Tooltip title={transaction.status === 'completed' ? 'Concluído' : 
                                    transaction.status === 'pending' ? 'Pendente' : 'Falhou'}>
                        <Chip
                          label={transaction.status === 'completed' ? 'Concluído' : 
                                transaction.status === 'pending' ? 'Pendente' : 'Falhou'}
                          color={transaction.status === 'completed' ? 'success' : 
                                transaction.status === 'pending' ? 'warning' : 'error'}
                          size="small"
                        />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </MainLayout>
  );
};

export default ResellerDashboard; 