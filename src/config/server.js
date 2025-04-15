const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { body, validationResult } = require('express-validator');

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
const ebooksRoutes = require('../routes/ebooks');
const usersRoutes = require('../routes/users');
const auth = require('../middleware/auth');

app.use('/api/ebooks', auth, ebooksRoutes);
app.use('/api/users', usersRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API do Marketplace de E-books funcionando!' });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

module.exports = app; 