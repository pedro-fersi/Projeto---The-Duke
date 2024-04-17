const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '250600',
  database: 'cadastro_usuarios'
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Middleware para processar dados JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar o servidor para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota para registrar um novo usuário
app.post('/registro', async (req, res) => {
  const { usuario, senha, email } = req.body;
  const hashedPassword = await bcrypt.hash(senha, 10);

  const sql = 'INSERT INTO usuarios (usuario, senha, email) VALUES (?, ?, ?)';
  db.query(sql, [usuario, hashedPassword, email], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao registrar usuário');
    } else {
      res.status(200).send('Usuário registrado com sucesso');
    }
  });
});

// Rota para fazer login
app.post('/login', async (req, res) => {
  const { usuario, senha } = req.body;

  const sql = 'SELECT * FROM usuarios WHERE usuario = ?';
  db.query(sql, [usuario], async (err, result) => {
    if (err || result.length === 0) {
      res.status(401).send('Usuário não encontrado');
    } else {
      const match = await bcrypt.compare(senha, result[0].senha);
      if (match) {
        res.status(200).send('Login bem-sucedido');
      } else {
        res.status(401).send('Senha incorreta');
      }
    }
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
