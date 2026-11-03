// Load live product information from the DummyJSON API.
export let products = [];

export async function loadProducts() {
    try {
        const response = await fetch("https://dummyjson.com/products");

        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();

        // Convert API fields into the property names used by this project.
        products = data.products.map((item) => ({
            productName: item.title,
            price: item.price,
            category: item.category,
            inStock: item.stock > 0
        }));

        return products;
    } catch (error) {
        // Pass a clear message to the page so the user does not see technical details.
        throw new Error("We couldn't load the products right now. Please try again later.");
    }
}
