import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Grid,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

interface Sale {
  id: string;
  date: string;
  customer: string;
  amount: number;
  commission: number;
  status: string;
}

const Dashboard: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const { user } = useAuth();

  // Dados simulados (em produção, isso viria da API)
  const sales: Sale[] = [
    {
      id: 'ORD-123456',
      date: '01/01/2024',
      customer: 'João Silva',
      amount: 99.99,
      commission: 19.99,
      status: 'Concluído'
    },
    {
      id: 'ORD-123457',
      date: '02/01/2024',
      customer: 'Maria Santos',
      amount: 149.99,
      commission: 29.99,
      status: 'Concluído'
    }
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Painel do {user?.role === 'reseller' ? 'Revendedor' : 'Usuário'}
      </Typography>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Comprovantes" />
          <Tab label="Relatórios de Vendas" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Número do Pedido</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell>Cliente</TableCell>
                  <TableCell>Valor</TableCell>
                  {user?.role === 'reseller' && <TableCell>Comissão</TableCell>}
                  <TableCell>Status</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell>{sale.id}</TableCell>
                    <TableCell>{sale.date}</TableCell>
                    <TableCell>{sale.customer}</TableCell>
                    <TableCell>R$ {sale.amount.toFixed(2)}</TableCell>
                    {user?.role === 'reseller' && (
                      <TableCell>R$ {sale.commission.toFixed(2)}</TableCell>
                    )}
                    <TableCell>{sale.status}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => window.print()}
                      >
                        Imprimir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          {user?.role === 'reseller' && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Resumo de Vendas
                  </Typography>
                  <Typography variant="body1">
                    Total de Vendas: R$ {sales.reduce((acc, sale) => acc + sale.amount, 0).toFixed(2)}
                  </Typography>
                  <Typography variant="body1">
                    Total de Comissões: R$ {sales.reduce((acc, sale) => acc + sale.commission, 0).toFixed(2)}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Métricas
                  </Typography>
                  <Typography variant="body1">
                    Vendas no Mês: {sales.length}
                  </Typography>
                  <Typography variant="body1">
                    Média por Venda: R$ {(sales.reduce((acc, sale) => acc + sale.amount, 0) / sales.length).toFixed(2)}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          )}
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default Dashboard; 