import { products } from "./products.js";
import { addToCart, getCartCount } from "./cart.js";


// Render the current cart count in the navigation.
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.textContent = String(getCartCount());
    }
}


// Show product information and wire up each Add to Cart button.
function renderProducts(productList) {
    const productGrid = document.getElementById("product-grid");
    const errorMessage = document.getElementById("error-message");


    if (!productGrid || !errorMessage) return;


    productGrid.innerHTML = "";


    productList.forEach((product) => {
        const productCard = document.createElement("article");
        productCard.className = "product-card";


        const nameHeading = document.createElement("h3");
        nameHeading.textContent = product.productName;


        const categoryText = document.createElement("p");
        categoryText.textContent = `Category: ${product.category}`;


        const priceText = document.createElement("p");
        priceText.textContent = `Price: $${product.price.toFixed(2)}`;


        const stockText = document.createElement("p");
        stockText.textContent = product.inStock ? "In Stock" : "Out of Stock";


        const addButton = document.createElement("button");
        addButton.type = "button";
        addButton.textContent = "Add to Cart";
        addButton.disabled = !product.inStock;


        addButton.addEventListener("click", () => {
            try {
                // addToCart throws an error if the product is missing or unavailable.
                addToCart(product.productName);
                errorMessage.textContent = `${product.productName} was added to your cart.`;
                errorMessage.classList.remove("error");
                errorMessage.classList.add("success");
                updateCartCount();
            } catch (error) {
                // Show helpful feedback in the page instead of using alert or console.log.
                errorMessage.textContent = error.message || "Sorry, we couldn't add that item. Please try again.";
                errorMessage.classList.remove("success");
                errorMessage.classList.add("error");
            } finally {
                // Ensure the button is available again after the attempt.
                addButton.disabled = !product.inStock;
            }
        });


        productCard.append(nameHeading, categoryText, priceText, stockText, addButton);
        productGrid.appendChild(productCard);
    });
}


document.addEventListener("DOMContentLoaded", () => {
    renderProducts(products);
    updateCartCount();
});
