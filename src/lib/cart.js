// Helper function for interacting with localStorage safely
function getLocalStorageItem(key) {
  if (typeof window === 'undefined') return null;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error getting from localStorage:', error);
    return null;
  }
}

function setLocalStorageItem(key, value) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting to localStorage:', error);
  }
}

// Get the cart from localStorage
export function getCart() {
  const cart = getLocalStorageItem('novelsols_cart');
  return cart ? cart : [];
}

// Set the cart to localStorage
export function setCart(cart) {
  setLocalStorageItem('novelsols_cart', cart);
}

// Add an item to the cart
export function addToCart(product, quantity = 1) {
  if (typeof window === 'undefined') return [];
  
  // Fetch existing cart
  const cart = getCart();
  
  // Find the product in the cart
  const existingProduct = cart.find(item => Number(item.id) === Number(product.id));
  
  // Update quantity or add new item to the cart
  if (existingProduct) {
    existingProduct.quantity += Number(quantity);
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      sku: product.sku || product.code || '',
      image: product.image || '',
      category: product.category || '',
      subcategory: product.subcategory || '',
      quantity: Number(quantity),
    });
  }
  
  // Save the updated cart to localStorage
  setCart(cart);
  
  // Dispatch custom event to notify other parts of the app
  try {
    window.dispatchEvent(new CustomEvent('novelsols_cart_changed', { detail: { cart } }));
  } catch (e) {
    console.error('Error dispatching cart changed event:', e);
  }

  return cart;
}

// Remove a product from the cart
export function removeFromCart(productId) {
  if (typeof window === 'undefined') return [];

  // Fetch the cart
  const cart = getCart();
  
  // Filter out the product to be removed
  const updatedCart = cart.filter(item => item.id !== productId);
  
  // Save the updated cart to localStorage
  setCart(updatedCart);
  
  // Dispatch custom event
  try {
    window.dispatchEvent(new CustomEvent('novelsols_cart_changed', { detail: { cart: updatedCart } }));
  } catch (e) {
    console.error('Error dispatching cart changed event:', e);
  }

  return updatedCart;
}

// Update the quantity of a product in the cart
export function updateQuantity(productId, newQuantity) {
  if (typeof window === 'undefined') return [];
  
  // Ensure valid quantity
  if (newQuantity <= 0) return removeFromCart(productId);
  
  // Fetch the cart
  const cart = getCart();
  
  // Find the product
  const product = cart.find(item => item.id === productId);
  
  // If product exists, update its quantity
  if (product) {
    product.quantity = newQuantity;
  }
  
  // Save the updated cart to localStorage
  setCart(cart);
  
  // Dispatch custom event
  try {
    window.dispatchEvent(new CustomEvent('novelsols_cart_changed', { detail: { cart } }));
  } catch (e) {
    console.error('Error dispatching cart changed event:', e);
  }

  return cart;
}
