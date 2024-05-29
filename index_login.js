const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Configuração do body-parser para lidar com dados JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '250600',
  database: 'cadastro_usuarios'
});

// Conectar ao banco de dados MySQL
connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão ao banco de dados MySQL estabelecida com sucesso');
});

// Rota para lidar com solicitações POST para '/login'
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Verificar no banco de dados se o usuário existe e as credenciais estão corretas
  const query = `SELECT * FROM usuarios WHERE username = ? AND senha = ?`;
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta no banco de dados:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }

    if (results.length === 1) {
      // Usuário autenticado com sucesso
      res.status(200).json({ message: 'Login bem-sucedido' });
    } else {
      // Credenciais inválidas
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  });
});

// Rota para lidar com solicitações POST para '/registro'
app.post('/registro', (req, res) => {
  const { username, password, email } = req.body;

  // Verificar se o usuário já existe no banco de dados
  const checkQuery = `SELECT * FROM usuarios WHERE username = ?`;
  connection.query(checkQuery, [username], (err, results) => {
    if (err) {
      console.error('Erro ao verificar usuário no banco de dados:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }

    if (results.length > 0) {
      // O usuário já existe
      res.status(409).json({ error: 'Usuário já existe' });
      return;
    }

    // Inserir novo usuário no banco de dados
    const insertQuery = `INSERT INTO usuarios (username, senha, email) VALUES (?, ?, ?)`;
    connection.query(insertQuery, [username, password, email], (err, results) => {
      if (err) {
        console.error('Erro ao inserir usuário no banco de dados:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
        return;
      }
      
      // Novo usuário registrado com sucesso
      res.status(201).json({ message: 'Usuário registrado com sucesso' });
    });
  });
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
