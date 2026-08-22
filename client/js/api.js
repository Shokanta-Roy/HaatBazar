const API_BASE_URL = "http://localhost:5000/api";

async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);

    throw error;
  }
}

/* PRODUCTS */

async function getProducts() {
  return apiRequest("/products");
}

async function getProduct(id) {
  return apiRequest(`/products/${id}`);
}

/* AUTH */

async function registerUser(userData) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

async function loginUser(userData) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

/* ORDERS */

async function createOrder(orderData) {
  const token = localStorage.getItem("token");

  return apiRequest("/orders", {
    method: "POST",

    headers: {
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(orderData),
  });
}
