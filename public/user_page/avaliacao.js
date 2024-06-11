document.addEventListener('DOMContentLoaded', function() {
    var stars = document.querySelectorAll('.star-icon');
    var feedbackMessage = document.getElementById('feedback-message');

    document.addEventListener('click', function(e) {
        var classStar = e.target.classList;
        if (classStar.contains('star-icon')) {
            stars.forEach(function(star) {
                star.classList.remove('ativo');
            });
            classStar.add('ativo');
            var rating = e.target.getAttribute('data-avaliacao');
            console.log(rating);

            // Mensagens personalizadas com base na avaliação
            var messages = {
                1: "Sentimos muito que você não tenha gostado. Por favor, diga-nos como podemos melhorar.",
                2: "Parece que há algo que não gostou. Estamos ouvindo suas sugestões!",
                3: "Obrigado pela sua avaliação! Estamos sempre buscando melhorar.",
                4: "Que bom que você gostou! Ficamos felizes com seu feedback.",
                5: "Maravilhoso! Agradecemos muito sua avaliação máxima!"
            };

            // Remover classes anteriores de cor
            feedbackMessage.classList.remove('low-rating', 'medium-rating', 'high-rating');

            // Adicionar nova classe de cor baseada na avaliação
            if (rating <= 2) {
                feedbackMessage.classList.add('low-rating');
            } else if (rating <= 4) {
                feedbackMessage.classList.add('medium-rating');
            } else {
                feedbackMessage.classList.add('high-rating');
            }

            feedbackMessage.innerHTML = `<p>${messages[rating]}</p>`;
            feedbackMessage.style.display = 'block'; // Mostrar a mensagem
        }
    });
});
