import { products } from "./products.js";

// Store the products selected by the customer.
export const cart = [];

export function addToCart(productName) {
    const product = products.find((item) => item.productName === productName);

    if (!product) {
        throw new Error("We couldn't find that product. Please refresh the shop and try again.");
    }

    if (!product.inStock) {
        throw new Error(`${product.productName} is currently out of stock.`);
    }

    // Increase the quantity when the product is already in the cart.
    const existingItem = cart.find((item) => item.productName === productName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        // Add a copy of the product with its starting quantity set to one.
        cart.push({ ...product, quantity: 1 });
    }

    return cart;
}

export function removeFromCart(productName) {
    // Find the selected product and remove its cart entry.
    const index = cart.findIndex((item) => item.productName === productName);

    if (index !== -1) {
        cart.splice(index, 1);
    }

    return cart;
}

export function getCartCount() {
    // Add quantities together so the count reflects total units, not unique products.
    return cart.reduce((count, item) => count + item.quantity, 0);
}

export function getCartTotal() {
    // Multiply each product's price by its quantity, then add the amounts together.
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}
