document.getElementById("loginFormHTML").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que o formulário seja enviado normalmente

    // Obtém os dados do formulário
    const formData = new FormData(this);

    // Envia os dados para o servidor usando AJAX
    fetch("http://localhost:3000/login", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Exibe a resposta do servidor
    })
    .catch(error => {
        console.error("Erro ao enviar dados:", error);
    });
});

document.getElementById("registerFormHTML").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que o formulário seja enviado normalmente

    // Obtém os dados do formulário
    const formData = new FormData(this);

    // Envia os dados para o servidor usando AJAX
    fetch("http://localhost:3000/registro", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Exibe a resposta do servidor
    })
    .catch(error => {
        console.error("Erro ao enviar dados:", error);
    });
});