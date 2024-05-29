const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();

// Configuração do middleware para analisar dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração para servir arquivos estáticos (como HTML)
app.use(express.static(path.join(__dirname, 'public')));

// Configuração da conexão com o banco de dados MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '250600',
    database: 'cadastro_usuarios'
});

// Conectar-se ao banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão bem-sucedida ao banco de dados MySQL');
});

// Rota para exibir a página de login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Rota para processar os dados do formulário de login
app.post('/login', (req, res) => {
    const { usuario, senha } = req.body;

    // Aqui você colocará a lógica para autenticar o usuário
    // Exemplo básico: apenas redirecionar para a página de perfil
    res.redirect('/perfil');
});

// Rota para exibir a página de cadastro
app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cadastro.html'));
});

// Rota para processar os dados do formulário de cadastro
app.post('/cadastro', (req, res) => {
    const { usuario, senha, email } = req.body;

    // Aqui você colocará a lógica para inserir um novo usuário no banco de dados
    const sql = 'INSERT INTO usuarios (usuario, senha, email) VALUES (?, ?, ?)';
    connection.query(sql, [usuario, senha, email], (error, results, fields) => {
        if (error) {
            console.error('Erro ao inserir novo usuário:', error);
            return res.redirect('/cadastro?erro=erro-ao-registrar');
        }
        console.log('Novo usuário registrado com sucesso');
        res.redirect('/login');
    });
});

// Rota para a página de perfil (apenas para fins de demonstração)
app.get('/perfil', (req, res) => {
    res.send('Página de perfil do usuário');
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
