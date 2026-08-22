function getCart() {
  return JSON.parse(localStorage.getItem("haatbazar_cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("haatbazar_cart", JSON.stringify(cart));

  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();

  const count = cart.reduce((total, item) => total + item.quantity, 0);

  const element = document.getElementById("cart-count");

  if (element) {
    element.textContent = count;
  }
}

function addToCart(product) {
  const cart = getCart();

  const existingProduct = cart.find((item) => item._id === product._id);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  saveCart(cart);

  alert(`${product.name} added to cart!`);
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", updateCartCount);
