const products = [
    {
        productName: "Sandals",
        price: 22.99,
        category: "Footwear",
        inStock: true
    },
    {
        productName: "Sneakers",
        price: 50.99,
        category: "Footwear",
        inStock: true
    },
    {
        productName: "Cupcakes",
        price: 5.99,
        category: "Food item",
        inStock: false
    },
    {
        productName: "Lemon Bars",
        price: 4.49,
        category: "Food item",
        inStock: true
    }
];
// Empty cart array
const cart = [];

// Display the complete products array
console.log("All Products:", products);

// Function to add an available product to the cart
function addToCart(productName) {
    const product = products.find(
        item => item.productName === productName
    );

    if (!product) {
        console.log("Product not found:", productName);
    } else if (!product.inStock) {
        console.log("Sorry, this product is out of stock:", productName);
    } else {
        cart.push(product);
        console.log("Product added to cart:", product.productName);
    }
}
// Function to display cart items and calculate the total
function viewCart() {
    let total = 0;

    if (cart.length === 0) {
        console.log("Your cart is empty.");
        return;
    }

    for (const item of cart) {
        console.log(item.productName + " - $" + item.price.toFixed(2));
        total += item.price;
    }

    console.log("Total Price: $" + total.toFixed(2));
}

// Function to display products by category
function filterByCategory(category) {
    const matchingProducts = products.filter(
        product => product.category === category
    );
if (matchingProducts.length === 0) {
        console.log("No products found in this category:", category);
        return;
    }

    for (const product of matchingProducts) {
        console.log(product.productName + " - $" + product.price.toFixed(2));
    }
}

// Example function calls to test the code
addToCart("Sandals");
addToCart("Cupcakes");
addToCart("Lemon Bars");
addToCart("Unknown Product");

viewCart();

filterByCategory("Footwear");