  // Função JavaScript para rolar a página para baixo
  function scrollDown() {
    // Ajuste o valor do scroll para definir a posição para a qual deseja rolar
    window.scrollBy({
      top: window.innerHeight, // rolar uma tela para baixo
      left: 0,
      behavior: 'smooth' // animação suave
    });
  }

  function scrollToTop() {
    // Rola a página para o topo
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Adiciona uma animação suave de rolagem
    });
}