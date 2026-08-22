function renderCart() {
  const container = document.getElementById("cart-container");

  const cart = getCart();

  if (!cart.length) {
    container.innerHTML = `

            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:80px 20px;
            ">

                <div style="
                    font-size:70px;
                ">
                    🛒
                </div>

                <h2>
                    Your cart is empty
                </h2>

                <p style="
                    color:#475569;
                    margin:15px 0 25px;
                ">
                    Add some fresh products!
                </p>

                <a
                    href="products.html"
                    class="primary-btn"
                >
                    Start Shopping
                </a>

            </div>
        `;

    return;
  }

  let subtotal = 0;

  const itemsHTML = cart
    .map((item, index) => {
      const itemTotal = item.price * item.quantity;

      subtotal += itemTotal;

      return `

                <div style="
                    display:flex;
                    gap:20px;
                    padding:20px;
                    border:1px solid #e2e8f0;
                    border-radius:15px;
                    margin-bottom:15px;
                    align-items:center;
                ">

                    <div style="
                        width:100px;
                        height:100px;
                        background:#f1f5f9;
                        border-radius:12px;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        font-size:45px;
                    ">
                        ${getProductEmoji(item.category)}
                    </div>


                    <div style="flex:1;">

                        <h3>
                            ${item.name}
                        </h3>

                        <p style="
                            color:#16a34a;
                            font-weight:700;
                            margin:7px 0;
                        ">
                            ৳${item.price}
                        </p>


                        <div style="
                            display:flex;
                            gap:10px;
                            align-items:center;
                        ">

                            <button
                                onclick="changeQuantity(${index}, -1)"
                            >
                                −
                            </button>

                            <strong>
                                ${item.quantity}
                            </strong>

                            <button
                                onclick="changeQuantity(${index}, 1)"
                            >
                                +
                            </button>

                        </div>

                    </div>


                    <button
                        onclick="removeItem(${index})"
                        style="
                            border:none;
                            background:none;
                            color:#dc2626;
                            cursor:pointer;
                            font-weight:700;
                        "
                    >
                        Remove
                    </button>

                </div>
            `;
    })
    .join("");

  const delivery = subtotal >= 1000 ? 0 : 60;

  const total = subtotal + delivery;

  container.innerHTML = `

        <div>
            ${itemsHTML}
        </div>


        <div style="
            border:1px solid #e2e8f0;
            border-radius:15px;
            padding:25px;
            height:max-content;
        ">

            <h2>
                Order Summary
            </h2>


            <div style="
                display:flex;
                justify-content:space-between;
                margin-top:25px;
            ">

                <span>
                    Subtotal
                </span>

                <strong>
                    ৳${subtotal}
                </strong>

            </div>


            <div style="
                display:flex;
                justify-content:space-between;
                margin-top:15px;
            ">

                <span>
                    Delivery
                </span>

                <strong>
                    ৳${delivery}
                </strong>

            </div>


            <hr style="
                margin:20px 0;
                border:none;
                border-top:1px solid #e2e8f0;
            ">


            <div style="
                display:flex;
                justify-content:space-between;
                font-size:20px;
            ">

                <strong>
                    Total
                </strong>

                <strong>
                    ৳${total}
                </strong>

            </div>


            <a
                href="checkout.html"
                class="primary-btn"
                style="
                    width:100%;
                    margin-top:25px;
                "
            >
                Proceed to Checkout
            </a>

        </div>
    `;
}

function changeQuantity(index, amount) {
  const cart = getCart();

  cart[index].quantity += amount;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  saveCart(cart);

  renderCart();
}

function removeItem(index) {
  const cart = getCart();

  cart.splice(index, 1);

  saveCart(cart);

  renderCart();
}

renderCart();
