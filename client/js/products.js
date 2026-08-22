let allProducts = [];

async function loadProducts() {
  const container = document.getElementById("products-container");

  try {
    allProducts = await getProducts();

    displayProducts(allProducts);

    setupFilters();

    applyURLCategory();
  } catch (error) {
    container.innerHTML = `
            <div class="loading">
                Failed to load products.
                <br>
                Check whether your backend is running.
            </div>
        `;
  }
}

function displayProducts(products) {
  const container = document.getElementById("products-container");

  if (!products.length) {
    container.innerHTML = `
            <div class="loading">
                No products found.
            </div>
        `;

    return;
  }

  container.innerHTML = products
    .map((product) => createProductCard(product))
    .join("");
}

function setupFilters() {
  const search = document.getElementById("search-input");

  const category = document.getElementById("category-filter");

  search.addEventListener("input", filterProducts);

  category.addEventListener("change", filterProducts);
}

function filterProducts() {
  const search = document.getElementById("search-input").value.toLowerCase();

  const category = document.getElementById("category-filter").value;

  const filtered = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search);

    const matchesCategory = category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  displayProducts(filtered);
}

function applyURLCategory() {
  const params = new URLSearchParams(window.location.search);

  const category = params.get("category");

  if (!category) return;

  const select = document.getElementById("category-filter");

  select.value = category;

  filterProducts();
}

loadProducts();
