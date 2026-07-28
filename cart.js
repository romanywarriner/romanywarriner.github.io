/*==================================================
FROM PIT TO PRINT
SHOPPING CART
==================================================*/

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/*==================================================
SAVE CART
==================================================*/

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/*==================================================
ADD TO CART
==================================================*/

function addToCart(productID) {

    const product = products[productID];

    if (!product) {
        console.error("Product not found:", productID);
        return;
    }

    const existing = cart.find(item => item.id === productID);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: product.id,
            name: product.name,
            artist: product.artist,
            image: product.images[0],
            price: product.price,
            quantity: 1

        });

    }

    saveCart();

alert(product.name + " has been added to your cart!");

}

/*==================================================
REMOVE ITEM
==================================================*/

function removeItem(productID) {

    cart = cart.filter(item => item.id !== productID);

    saveCart();

    displayCart();

}

/*==================================================
CHANGE QUANTITY
==================================================*/

function changeQuantity(productID, amount) {

    const item = cart.find(item => item.id === productID);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {

        removeItem(productID);

        return;

    }

    saveCart();

    displayCart();

}

/*==================================================
DISPLAY CART
==================================================*/

function displayCart() {

    const container = document.getElementById("cart-items");

    if (!container) return;

    const empty = document.getElementById("cart-empty");

    const content = document.getElementById("cart-content");

    if (cart.length === 0) {

        empty.style.display = "block";

        content.style.display = "none";

        return;

    }

    empty.style.display = "none";

    content.style.display = "grid";

    container.innerHTML = "";

    let subtotal = 0;

    cart.forEach(item => {

        subtotal += item.price * item.quantity;

        container.innerHTML += `

<div class="cart-card">

    <img src="${item.image}" alt="${item.name}">

    <div class="cart-info">

        <h2>${item.name}</h2>

        <p>${item.artist}</p>

        <h3>£${item.price.toFixed(2)}</h3>

        <div class="quantity">

            <button onclick="changeQuantity('${item.id}',-1)">−</button>

            <span>${item.quantity}</span>

            <button onclick="changeQuantity('${item.id}',1)">+</button>

        </div>

        <button class="remove-btn"
        onclick="removeItem('${item.id}')">

            Remove

        </button>

    </div>

</div>

`;

    });

    document.getElementById("subtotal").textContent =
        "£" + subtotal.toFixed(2);

    document.getElementById("total").textContent =
        "£" + subtotal.toFixed(2);

}

/*==================================================
LOAD PAGE
==================================================*/

document.addEventListener("DOMContentLoaded", displayCart);