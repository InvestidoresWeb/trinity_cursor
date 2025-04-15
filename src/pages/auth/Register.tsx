import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
  Alert,
  CircularProgress,
  useTheme,
  ToggleButtonGroup,
  ToggleButton,
  Tooltip,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PersonIcon from '@mui/icons-material/Person';
import StorefrontIcon from '@mui/icons-material/Storefront';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  pixKey?: string;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Nome é obrigatório')
    .min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: yup
    .string()
    .required('E-mail é obrigatório')
    .email('Digite um e-mail válido'),
  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmPassword: yup
    .string()
    .required('Confirmação de senha é obrigatória')
    .oneOf([yup.ref('password')], 'As senhas devem ser iguais'),
  pixKey: yup.string().when('userType', {
    is: 'reseller',
    then: yup.string().required('Chave PIX é obrigatória para revendedores'),
  }),
});

const Register: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userType, setUserType] = useState<'customer' | 'reseller'>('customer');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);
      setError('');
      await signUp({ ...data, type: userType });
      navigate('/login');
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{
              mb: 3,
              color: theme.palette.primary.main,
              fontWeight: 'bold',
            }}
          >
            Criar Conta
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ mb: 3, width: '100%' }}>
            <Typography variant="subtitle1" gutterBottom align="center">
              Selecione o tipo de conta
            </Typography>
            <ToggleButtonGroup
              value={userType}
              exclusive
              onChange={(e, value) => value && setUserType(value)}
              aria-label="tipo de usuário"
              fullWidth
              sx={{ mt: 1 }}
            >
              <ToggleButton value="customer">
                <Tooltip title="Compre e-books para sua biblioteca">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PersonIcon sx={{ mr: 1 }} />
                    Cliente
                  </Box>
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="reseller">
                <Tooltip title="Revenda e-books e ganhe comissões">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <StorefrontIcon sx={{ mr: 1 }} />
                    Revendedor
                  </Box>
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ width: '100%' }}
          >
            <TextField
              margin="normal"
              fullWidth
              label="Nome completo"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
              disabled={loading}
            />

            <TextField
              margin="normal"
              fullWidth
              label="E-mail"
              type="email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={loading}
            />

            <TextField
              margin="normal"
              fullWidth
              label="Senha"
              type="password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              disabled={loading}
            />

            <TextField
              margin="normal"
              fullWidth
              label="Confirmar senha"
              type="password"
              {...register('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              disabled={loading}
            />

            {userType === 'reseller' && (
              <TextField
                margin="normal"
                fullWidth
                label="Chave PIX"
                {...register('pixKey')}
                error={!!errors.pixKey}
                helperText={
                  errors.pixKey?.message ||
                  'Sua chave PIX será usada para receber os pagamentos'
                }
                disabled={loading}
              />
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Criar Conta'
              )}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Já tem uma conta?{' '}
                <Link
                  component={RouterLink}
                  to="/login"
                  color="primary"
                  sx={{ fontWeight: 500 }}
                >
                  Faça login
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register; 