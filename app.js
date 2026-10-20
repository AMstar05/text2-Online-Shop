const productName = "Wireless Headphones";
const price = 49.99;
let inStock = true;
const category = "Electronics";

console.log("Product Name:", productName);
console.log("Price:", price);
console.log("In Stock:", inStock);
console.log("Category:", category);
// Store the available products in an array.
const products = [
    {
        name: productName,
        price: price,
        inStock: inStock,
        category: category
    },
    {
        name: "Bluetooth Speaker",
        price: 34.99,
        inStock: true,
        category: "Electronics"
    },
    {
        name: "USB-C Charger",
        price: 12.99,
        inStock: true,
        category: "Accessories"
    }
];

// Display product cards on the page.
function renderProducts(products) {
    const productGrid = document.getElementById("product-grid");

    // Make sure the product grid exists before displaying products.
    if (!productGrid) {
        console.error("The product-grid container was not found.");
        return;
    }

    // Clear the previous product cards before rendering new ones.
    productGrid.innerHTML = "";

    // Create a card for each product in the array.
    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        const nameHeading = document.createElement("h3");
        nameHeading.textContent = product.name;

        const categoryText = document.createElement("p");
        categoryText.textContent = `Category: ${product.category}`;

        const priceText = document.createElement("p");
        priceText.textContent = `Price: $${product.price.toFixed(2)}`;

        const stockText = document.createElement("p");
        stockText.textContent = product.inStock
            ? "In Stock"
            : "Out of Stock";

        // Create the Add to Cart button.
        const addButton = document.createElement("button");
        addButton.textContent = "Add to Cart";
        addButton.type = "button";

        // Prevent customers from adding unavailable products.
        addButton.disabled = !product.inStock;

        // Add the selected product to the shopping cart.
        addButton.addEventListener("click", () => {
            addToCart(product.name);
        });

        // Assemble the product card.
        productCard.appendChild(nameHeading);
        productCard.appendChild(categoryText);
        productCard.appendChild(priceText);
        productCard.appendChild(stockText);
        productCard.appendChild(addButton);

        // Add the completed card to the product grid.
        productGrid.appendChild(productCard);
    });
}

// Render the products when the page has finished loading.
document.addEventListener("DOMContentLoaded", () => {
    renderProducts(products);
});
