console.log("JavaScript connected!");

/*=========================================
SHARE BUTTON
=========================================*/

document.addEventListener("click", (e) => {

    const button = e.target.closest(".share-btn");

    if (!button) return;

    e.preventDefault();

    const shareData = {

        title: document.title,

        text: document.title,

        url: window.location.href

    };

    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    const canShare = navigator.share && window.isSecureContext;

    if (canShare && isIOS) {

        navigator.share(shareData).catch(() => {

            fallbackShare(shareData.url);

        });

    } else {

        fallbackShare(shareData.url);

    }

});

function fallbackShare(url){

    if(navigator.clipboard){

        navigator.clipboard.writeText(url);

        alert("Link copied!");

    }else{

        prompt("Copy this link:",url);

    }

}

/*=========================================
PRODUCT PAGE
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);

    const productID = params.get("product");

    if(!productID) return;

    const product = products[productID];

if(!product){
    console.error("Product not found:", productID);
    return;
}

    const button = document.getElementById("add-cart");

    button.dataset.product = productID;

    button.onclick = ()=>{

    addToCart(productID);
    }
    
    if(!productID) return;
    document.title = product.name;

    document.getElementById("product-name").textContent = product.name;

    document.getElementById("crumb-name").textContent = product.name;

    document.getElementById("artist").textContent = product.artist;

    document.getElementById("venue").textContent = product.venue;

    document.getElementById("date").textContent = product.date;

    document.getElementById("spec-artist").textContent = product.artist;

    document.getElementById("spec-venue").textContent = product.venue;

    document.getElementById("spec-date").textContent = product.date;

    document.getElementById("spec-paper").textContent = product.paper;

    document.getElementById("spec-frame").textContent = product.frame;

    document.getElementById("spec-orientation").textContent = product.orientation;

    document.getElementById("product-price").textContent =
        "£" + product.price.toFixed(2);

    document.getElementById("old-price").textContent =
        "£" + product.oldPrice.toFixed(2);

    document.getElementById("product-description").textContent =
        product.shortDescription;

    const longDescription = document.getElementById("long-description");

if (longDescription) {
    longDescription.textContent = product.longDescription;
}
const mainImage = document.getElementById("main-image");

console.log(product.images);
console.log(mainImage);
mainImage.src = product.images[0];

document.getElementById("thumb1").src = product.images[0];
document.getElementById("thumb2").src = product.images[1];
document.getElementById("thumb3").src = product.images[2];

const thumbs = document.querySelectorAll(".thumb");

thumbs.forEach((thumb) => {
    thumb.addEventListener("click", function () {
        mainImage.src = this.src;

        thumbs.forEach(t => t.classList.remove("active"));

        this.classList.add("active");
    });
});

});

/*=========================================
QUANTITY
=========================================*/

const quantity = document.getElementById("quantity");

if(quantity){

document.getElementById("plus").onclick = ()=>{

quantity.value++;

}

document.getElementById("minus").onclick = ()=>{

if(quantity.value>1){

quantity.value--;

}

}

}

document.addEventListener("click", function (e) {

    const cartButton = e.target.closest(".cart-btn, .cart-btn2");

    if (!cartButton) return;

    console.log("Button clicked!");
    console.log(cartButton.dataset.product);

    e.preventDefault();

    addToCart(cartButton.dataset.product);

});