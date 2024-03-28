// Mapeamento dos modelos para as páginas
var mapaModeloParaPagina = {
  'Camiseta preta': 'Camiseta1.html',
  'Camiseta branca': 'Camiseta2.html',
  'Camiseta azul': 'Camiseta3.html'
};

document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita o comportamento padrão do formulário
  var consulta = document.getElementById('search-input').value;
  fetch('/pesquisa?q=' + consulta)
    .then(response => response.json())
    .then(data => {
      data.forEach(function(camiseta) {
        if (camiseta.modelo === consulta) {
          // Redireciona para a página correspondente ao modelo
          window.location.href = mapaModeloParaPagina[camiseta.modelo];
        }
      });
    });
});
