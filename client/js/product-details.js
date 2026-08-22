async function loadProduct() {
  const container = document.getElementById("product-details");

  const params = new URLSearchParams(window.location.search);

  const id = params.get("id");

  if (!id) {
    container.innerHTML = `
            <div class="loading">
                Product not found.
            </div>
        `;

    return;
  }

  try {
    const product = await getProduct(id);

    const emoji = getProductEmoji(product.category);

    container.innerHTML = `

            <div style="
                display:grid;
                grid-template-columns:1fr 1fr;
                gap:50px;
                align-items:center;
            ">

                <div style="
                    height:450px;
                    background:#f1f5f9;
                    border-radius:20px;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    font-size:140px;
                    overflow:hidden;
                ">

                    ${
                      product.image
                        ? `<img
                            src="${product.image}"
                            alt="${product.name}"
                            style="
                                width:100%;
                                height:100%;
                                object-fit:cover;
                            "
                          >`
                        : emoji
                    }

                </div>


                <div>

                    <p class="section-label">
                        ${product.category}
                    </p>

                    <h1 style="
                        font-size:45px;
                        margin:15px 0;
                    ">
                        ${product.name}
                    </h1>


                    <p style="
                        color:#475569;
                        line-height:1.7;
                        margin-bottom:25px;
                    ">
                        ${
                          product.description ||
                          "Fresh quality product from HaatBazar."
                        }
                    </p>


                    <h2 style="
                        font-size:35px;
                        margin-bottom:10px;
                    ">
                        ৳${product.price}
                    </h2>


                    <p style="
                        color:#475569;
                        margin-bottom:25px;
                    ">
                        Stock available:
                        ${product.stock}
                    </p>


                    <button
                        class="primary-btn"
                        onclick='addToCart(${JSON.stringify(product)})'
                    >
                        Add to Cart
                    </button>

                    <a
                        href="cart.html"
                        class="secondary-btn"
                        style="margin-left:10px;"
                    >
                        View Cart
                    </a>

                </div>

            </div>
        `;
  } catch (error) {
    container.innerHTML = `
            <div class="loading">
                Unable to load product.
            </div>
        `;
  }
}

loadProduct();
