import { loadProducts } from "./products.js";
import {
    cart,
    addToCart,
    removeFromCart,
    getCartCount,
    getCartTotal
} from "./cart.js";

const productGrid = document.getElementById("product-grid");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const errorMessage = document.getElementById("error-message");

function showMessage(message) {
    if (errorMessage) errorMessage.textContent = message;
}

function renderProducts(productList) {
    if (!productGrid) return;

    productGrid.innerHTML = "";

    productList.forEach((product) => {
        const card = document.createElement("article");
        card.className = "product-card";

        const heading = document.createElement("h3");
        heading.textContent = product.productName;

        const category = document.createElement("p");
        category.textContent = `Category: ${product.category}`;

        const price = document.createElement("p");
        price.textContent = `Price: $${product.price.toFixed(2)}`;

        const stock = document.createElement("p");
        stock.textContent = product.inStock ? "In Stock" : "Out of Stock";

        const addButton = document.createElement("button");
        addButton.type = "button";
        addButton.textContent = "Add to Cart";
        addButton.disabled = !product.inStock;

        addButton.addEventListener("click", () => {
            try {
                addToCart(product.productName);
                showMessage("");
            } catch (error) {
                showMessage(error.message);
            } finally {
                renderCart();
            }
        });

        card.append(heading, category, price, stock, addButton);
        productGrid.appendChild(card);
    });
}

function renderCart() {
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = "";

        cart.forEach((item) => {
            const row = document.createElement("div");
            row.className = "cart-item";

            const description = document.createElement("span");
            description.textContent =
                `${item.productName} — $${item.price.toFixed(2)} × ${item.quantity}`;

            const removeButton = document.createElement("button");
            removeButton.type = "button";
            removeButton.textContent = "Remove";

            // Remove this product and redraw the cart as soon as the button is clicked.
            removeButton.addEventListener("click", () => {
                removeFromCart(item.productName);
                renderCart();
            });

            row.append(description, removeButton);
            cartItemsContainer.appendChild(row);
        });
    }

    // Update the cart count and running total after rendering the cart items.
    if (cartCount) cartCount.textContent = getCartCount();
    if (cartTotal) cartTotal.textContent = `$${getCartTotal().toFixed(2)}`;
}

async function initializeShop() {
    try {
        const productList = await loadProducts();
        renderProducts(productList);
    } catch (error) {
        // A failed request leaves an empty product list instead of stopping the app.
        renderProducts([]);
        showMessage(error.message);
    }

    renderCart();
}

document.addEventListener("DOMContentLoaded", initializeShop);
