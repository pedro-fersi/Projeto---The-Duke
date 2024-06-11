// Importar os módulos necessários
const express = require('express');
const mongoose = require('mongoose');

// Criar uma instância do aplicativo express
const app = express();

// Porta do servidor
const PORT = process.env.PORT || 3000;

// Conectar ao banco de dados MongoDB
mongoose.connect('mongodb://localhost:27017/nome-do-banco-de-dados')
  .then(() => {
    console.log('Conexão com o MongoDB estabelecida com sucesso');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err.message);
    process.exit(1); // Encerrar o processo em caso de erro
  });

// Definir o esquema do produto usando Mongoose
const produtoSchema = new mongoose.Schema({
  nome: String,
  estoque: Number
});

// Criar um modelo com base no esquema
const Produto = mongoose.model('Produto', produtoSchema);

// Configurar o servidor para lidar com solicitações JSON
app.use(express.json());

// Rota para obter o estoque de um produto específico
app.get('/', async (req, res) => {
  const nomeProduto = req.params.produto;

  try {
    const produto = await Produto.findOne({ nome: nomeProduto });

    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json({ estoque: produto.estoque });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para atualizar o estoque após uma compra
app.post('/comprar', async (req, res) => {
  const { produto, quantidade } = req.body;

  try {
    const updatedProduto = await Produto.findOneAndUpdate(
      { nome: produto },
      { $inc: { estoque: -quantidade } }, // Decrementar o estoque em 'quantidade'
      { new: true } // Retorna o documento atualizado
    );

    if (!updatedProduto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json({ message: 'Estoque atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor está ouvindo na porta ${PORT}`);
});
