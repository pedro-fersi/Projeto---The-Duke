if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

var totalAmount = "0,00";

function ready() {
    const removeProductButtons = document.getElementsByClassName("remove-product-button");
    for (let i = 0; i < removeProductButtons.length; i++) {
        removeProductButtons[i].addEventListener("click", removeProducts);
    }

    const quantityInputs = document.getElementsByClassName("product-qtd-input");
    for (let i = 0; i < quantityInputs.length; i++) {
        quantityInputs[i].addEventListener("change", checkIfInputIsNull);
    }

    const addToCartButtons = document.getElementsByClassName("botao_comprar");
    for (let i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener("click", addProductToCart);
    }

    const purchaseButton = document.getElementsByClassName("purchase-button")[0];
    purchaseButton.addEventListener("click", makePurchase);

    loadCart();
    updateTotal();
}

function makePurchase() {
    console.log("Botão Finalizar Compra clicado!");
    if (totalAmount === "0,00") {
        alert("Seu carrinho está vazio!");
    } else {
        alert(`
            Obrigado pela sua compra!
            Valor do pedido: R$${totalAmount}
            Volte sempre!
        `);
    }

    // Desabilita o botão "Comprar" e atualiza o estoque para produtos no carrinho
    const cartProducts = document.querySelectorAll(".cart-product");
    cartProducts.forEach(product => {
        const productTitleElement = product.querySelector(".cart-product-title");
        const productSize = getProductSize(productTitleElement.innerText);
        if (productSize) {
            const sizeInput = document.querySelector(`input[data-tamanho="${productSize}"]`);
            if (sizeInput) {
                sizeInput.disabled = true; // Desabilita o botão "Comprar" para este tamanho
                sizeInput.nextElementSibling.style.backgroundColor = "gray"; // Altera o estilo para indicar que está indisponível
                // Atualiza o estoque (reduzindo em 1)
                const estoqueDisponivel = parseInt(sizeInput.getAttribute('data-estoque'));
                sizeInput.setAttribute('data-estoque', estoqueDisponivel - 1);
            }
        }
    });

    document.querySelector(".cart-table tbody").innerHTML = "";
    localStorage.removeItem("cart");
    updateTotal();
}

function getProductSize(productTitle) {
    // Exemplo de título do produto: "Camiseta 1 (P)"
    const regex = /\((\w+)\)/; // Expressão regular para extrair o tamanho entre parênteses
    const match = regex.exec(productTitle);
    if (match && match.length > 1) {
        return match[1]; // Retorna o tamanho encontrado
    }
    return null; // Retorna null se nenhum tamanho for encontrado
}

function checkIfInputIsNull(event) {
    if (event.target.value === "0") {
        event.target.parentElement.parentElement.remove();
    }
    updateTotal();
    saveCart();
}

function addProductToCart(event) {
    const button = event.target;
    const productInfos = button.parentElement.parentElement;
    const productImage = productInfos.getElementsByClassName("product-image")[0].src;
    const productTitle = productInfos.getElementsByClassName("product-title")[0].innerText;
    const productPrice = productInfos.getElementsByClassName("product-price")[0].innerText;
    const selectedSize = document.querySelector('input[name="tamanho"]:checked');

    if (!selectedSize) {
        alert("Por favor, selecione um tamanho.");
        return;
    }

    const productSize = selectedSize.getAttribute('data-tamanho');
    let estoqueDisponivel = parseInt(selectedSize.getAttribute('data-estoque'));

    if (estoqueDisponivel <= 0) {
        alert("Desculpe, este tamanho está esgotado.");
        return;
    }

    const productCartNames = document.getElementsByClassName("cart-product-title");
    for (let i = 0; i < productCartNames.length; i++) {
        if (productCartNames[i].innerText === `${productTitle} (${productSize})`) {
            let quantityInput = productCartNames[i].parentElement.parentElement.getElementsByClassName("product-qtd-input")[0];
            quantityInput.value = parseInt(quantityInput.value) + 1;
            updateTotal();
            saveCart();
            return;
        }
    }

    let newCartProduct = document.createElement("tr");
    newCartProduct.classList.add("cart-product");

    newCartProduct.innerHTML = 
    `
        <td class="product-identification">
            <img src="${productImage}" alt="${productTitle}" class="cart-product-image">
            <strong class="cart-product-title">${productTitle} (${productSize})</strong>
        </td>
        <td>
            <span class="cart-product-price">${productPrice}</span>
        </td>
        <td>
            <input type="number" value="1" min="0" class="product-qtd-input">
            <button type="button" class="remove-product-button">Remover</button>
        </td>
    `;

    const tableBody = document.querySelector(".cart-table tbody");
    if (tableBody) {
        tableBody.append(newCartProduct);
        newCartProduct.getElementsByClassName("remove-product-button")[0].addEventListener("click", removeProducts);
        newCartProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change", checkIfInputIsNull);
        updateTotal();
        saveCart();

        // Subtraia 1 do estoque
        estoqueDisponivel--;
        selectedSize.setAttribute('data-estoque', estoqueDisponivel);

        // Desabilite o botão se o estoque estiver esgotado
        if (estoqueDisponivel === 0) {
            button.disabled = true;
        }
    } else {
        console.error("Elemento tbody não encontrado");
    }
}


function removeProducts(event) {
    event.target.parentElement.parentElement.remove();
    updateTotal();
    saveCart();
}

function updateTotal() {
    totalAmount = 0;
    const cartProducts = document.getElementsByClassName("cart-product");
    for (let i = 0; i < cartProducts.length; i++) {
        const productPriceElement = cartProducts[i].querySelector(".cart-product-price");
        if (productPriceElement) {
            const productPrice = parseFloat(productPriceElement.innerText.replace("R$", "").replace(",", "."));
            const productQuantity = parseInt(cartProducts[i].querySelector(".product-qtd-input").value);

            totalAmount += productPrice * productQuantity;
        } else {
            console.error("Elemento de preço não encontrado");
        }
    }

    totalAmount = totalAmount.toFixed(2);
    totalAmount = totalAmount.replace(".", ",");

    const totalContainer = document.querySelector(".cart-total-container span");
    if (totalContainer) {
        totalContainer.innerText = "R$" + totalAmount;
    } else {
        console.error("Elemento de contêiner de total não encontrado");
    }
}

function saveCart() {
    const cartProducts = document.getElementsByClassName("cart-product");
    const cart = [];
    for (let i = 0; i < cartProducts.length; i++) {
        const productImage = cartProducts[i].querySelector(".cart-product-image").src;
        const productTitle = cartProducts[i].querySelector(".cart-product-title").innerText;
        const productPrice = cartProducts[i].querySelector(".cart-product-price").innerText;
        const productQuantity = cartProducts[i].querySelector(".product-qtd-input").value;
        
        cart.push({
            image: productImage,
            title: productTitle,
            price: productPrice,
            quantity: productQuantity
        });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    for (let i = 0; i < cart.length; i++) {
        let newCartProduct = document.createElement("tr");
        newCartProduct.classList.add("cart-product");

        newCartProduct.innerHTML = 
        `
            <td class="product-identification">
                <img src="${cart[i].image}" alt="${cart[i].title}" class="cart-product-image">
                <strong class="cart-product-title">${cart[i].title}</strong>
            </td>
            <td>
                <span class="cart-product-price">${cart[i].price}</span>
            </td>
            <td>
                <input type="number" value="${cart[i].quantity}" min="0" class="product-qtd-input">
                <button type="button" class="remove-product-button">Remover</button>
            </td>
        `;

        const tableBody = document.querySelector(".cart-table tbody");
        if (tableBody) {
            tableBody.append(newCartProduct);
            newCartProduct.getElementsByClassName("remove-product-button")[0].addEventListener("click", removeProducts);
            newCartProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change", checkIfInputIsNull);
        } else {
            console.error("Elemento tbody não encontrado");
        }
    }
}