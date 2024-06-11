if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

var totalAmount = "0,00"

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

    const purchaseButton = document.getElementsByClassName("purchase-button")[0]
    purchaseButton.addEventListener("click", makePurchase)
}

function makePurchase() {
    if(totalAmount === "0,00") {
        alert("Seu carrinho está vazio!")
    } else {
        alert(
            `
            Obrigado pela sua compra!
            Valor do pedido: R$${totalAmount}
            Volte sempre!
            `

        )
    }

    document.querySelector(".cart-table tbody").innerHTML = ""
    updateTotal()
}

function checkIfInputIsNull(event){
    if(event.target.value === "0"){
        event.target.parentElement.parentElement.remove()
    }

    updateTotal()
}

function addProductToCart(event) {
    const button = event.target;
    const productInfos = button.parentElement.parentElement;
    const productImage = productInfos.getElementsByClassName("product-image")[0].src;
    const productTitle = productInfos.getElementsByClassName("product-title")[0].innerText;
    const productPrice = productInfos.getElementsByClassName("product-price")[0].innerText;

    const productCartNames = document.getElementsByClassName("cart-product-title");
    for (let i = 0; i < productCartNames.length; i++) {
        if (productCartNames[i].innerText === productTitle) {
            let quantityInput = productCartNames[i].parentElement.parentElement.getElementsByClassName("product-qtd-input")[0];
            quantityInput.value = parseInt(quantityInput.value) + 1;
            updateTotal();
            return;
        }
    }

    let newCartProduct = document.createElement("tr");
    newCartProduct.classList.add("cart-product");

    newCartProduct.innerHTML = 
    `
        <td class="product-identification">
            <img src="${productImage}" alt="${productTitle}" class="cart-product-image">
            <strong class="cart-product-title">${productTitle}</strong>
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
    } else {
        console.error("Elemento tbody não encontrado");
    }
}

function removeProducts(event) {
    event.target.parentElement.parentElement.remove();
    updateTotal();
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
