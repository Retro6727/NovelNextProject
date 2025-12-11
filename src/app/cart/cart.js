// Cart state
let cart = [];

// Add product to cart
function addToCart(product, quantity = 1) {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            image: product.image || '📦',
            name: product.name,
            code: product.code || '',
            price: product.price,
            quantity: quantity
        });
    }
}
// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
}

// Get all cart items
function getCartItems() {
    return cart;
}

// Clear cart
function clearCart() {
    cart = [];
}

// Get cart total
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

export { addToCart, removeFromCart, getCartItems, clearCart, getCartTotal };