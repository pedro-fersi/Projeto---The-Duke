// Armazenar caminhos das imagens em um objeto
const caminhosDasImagens = {
    linha1: '/Projeto - The Duke/Camisa 1/teste 1 camiseta.svg',
    linha2: '/Projeto - The Duke/Camisa 1/teste 1 camiseta (Frente).svg',
    linha3: '/Projeto - The Duke/Camisa 1/teste 1 camiseta (Costas).svg'
};

// Função para mudar a imagem principal
function mudarImagemPrincipal(caminhoDaImagem) {
    document.getElementById('imagemPrincipal').src = caminhoDaImagem;
}

// Adicionando eventos de clique às linhas
document.getElementById('botaoLinha1').addEventListener('click', function() {
    mudarImagemPrincipal(caminhosDasImagens.linha1);
});

document.getElementById('botaoLinha2').addEventListener('click', function() {
    mudarImagemPrincipal(caminhosDasImagens.linha2);
});

document.getElementById('botaoLinha3').addEventListener('click', function() {
    mudarImagemPrincipal(caminhosDasImagens.linha3);
});