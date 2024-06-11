const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // Módulo para lidar com caminhos de arquivos

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar ao banco de dados MongoDB
mongoose.connect('mongodb://localhost:27017/estoque-the-duke')
    .then(() => {
        console.log('Conexão com o MongoDB estabelecida com sucesso');
    })
    .catch((err) => {
        console.error('Erro ao conectar ao MongoDB:', err.message);
        process.exit(1);
    });

// Configurar o Express para servir arquivos estáticos
// Servir arquivos estáticos (CSS, imagens, etc.)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/home_page', express.static(path.join(__dirname, 'public', 'home_page')));


// Definir rotas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home_page', 'index.html'));
});


// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor está ouvindo na porta ${PORT}`);
});
