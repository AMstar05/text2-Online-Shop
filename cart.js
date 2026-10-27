import { products } from "./products.js";


// Keep cart data and cart-related functions in this module.
export const cart = [];


// Add a product only after checking that it exists and is available.
export function addToCart(productName) {
    const product = products.find(
        (item) => item.productName === productName
    );


    if (!product) {
        throw new Error("We couldn't find that product. Please refresh the shop and try again.");
    }


    if (!product.inStock) {
        throw new Error(`${product.productName} is currently out of stock. Please choose another item.`);
    }


    cart.push(product);
    return product;
}


// Return the number of items currently in the cart.
export function getCartCount() {
    return cart.length;
}
