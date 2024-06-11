// Armazenar caminhos das imagens em um objeto
const caminhosDasImagens = {
    linha1: '/Camisa 3/teste 3 camiseta.svg',
    linha2: '/Camisa 3/teste 3 camiseta (Frente).svg',
    linha3: '/Camisa 3/teste 3 camiseta (Costas).svg'
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