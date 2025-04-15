const app = require('./config/server');
const { query } = require('./config/database');

const PORT = process.env.PORT || 3000;

// Teste de conexão com o banco de dados
query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Erro ao conectar com o banco de dados:', err);
  } else {
    console.log('Conexão com o banco de dados estabelecida com sucesso');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 