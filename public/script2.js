document.getElementById('search-input').addEventListener('input', function() {
    var consulta = this.value;
    fetch('/pesquisa?q=' + consulta)
      .then(response => response.json())
      .then(data => {
        var searchResults = document.getElementById('search-results');
        searchResults.innerHTML = '';
        data.forEach(function(camiseta) {
          var p = document.createElement('p');
          p.textContent = camiseta.modelo;
          searchResults.appendChild(p);
        });
      });
  });
  