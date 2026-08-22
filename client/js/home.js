async function loadFeaturedProducts() {
  const container = document.getElementById("featured-products");

  if (!container) return;

  try {
    const products = await getProducts();

    if (!products.length) {
      container.innerHTML = `
                <div class="loading">
                    No products available.
                </div>
            `;

      return;
    }

    const featured = products.slice(0, 4);

    container.innerHTML = featured
      .map((product) => createProductCard(product))
      .join("");
  } catch (error) {
    container.innerHTML = `
            <div class="loading">
                Unable to load products.
                <br>
                Make sure the backend is running.
            </div>
        `;
  }
}

function createProductCard(product) {
  const emoji = getProductEmoji(product.category);

  return `
        <div class="product-card">

            <a href="product-details.html?id=${product._id}">

                <div class="product-image">
                    ${
                      product.image
                        ? `<img src="${product.image}"
                               alt="${product.name}"
                               style="width:100%;height:100%;object-fit:cover;">`
                        : emoji
                    }
                </div>

            </a>

            <div class="product-info">

                <div class="product-category">
                    ${product.category}
                </div>

                <h3 class="product-name">
                    ${product.name}
                </h3>

                <div class="product-price">
                    ৳${product.price}
                    <small>/ unit</small>
                </div>

                <button
                    class="add-cart"
                    onclick='addToCart(${JSON.stringify(product)})'
                >
                    Add to Cart
                </button>

            </div>

        </div>
    `;
}

function getProductEmoji(category) {
  const emojis = {
    Fish: "🐟",

    Meat: "🥩",

    Vegetables: "🥬",

    Fruits: "🍎",

    Grocery: "🛍️",

    Dairy: "🥛",

    default: "🛒",
  };

  return emojis[category] || emojis.default;
}

loadFeaturedProducts();
