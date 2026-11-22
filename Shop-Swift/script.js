
// ========================================
// 1. SHOP NOW BUTTON
// ========================================

const button = document.getElementById("shopBtn");

button.addEventListener("click", function() {
    alert("Welcome to Shop Swift!");
});


// ========================================
// 2. CART SETUP
// ========================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartDisplay = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");


// ========================================
// 3. PRODUCT SETUP
// ========================================

const productContainer = document.getElementById("product-container");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");

let products = [];
let selectedCategory = "all";


// ========================================
// 4. DISPLAY PRODUCTS
// ========================================

function renderProducts(productsToDisplay) {

    productContainer.innerHTML = "";

    if (productsToDisplay.length === 0) {
        productContainer.innerHTML = "<p>No products found.</p>";
        return;
    }

    productsToDisplay.forEach(function(product) {

        const card = document.createElement("div");

        card.classList.add("product-card");

        card.dataset.id = product.id;
        card.dataset.name = product.name;
        card.dataset.price = product.price;

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p>Price: ₹${product.price.toLocaleString("en-IN")}</p>

            <button class="add-cart">Add to Cart</button>

            <button class="details-btn">View Details</button>
        `;

        productContainer.appendChild(card);

    });
}


// ========================================
// 5. DISPLAY CART
// ========================================

function displayCart() {

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    }

    cart.forEach(function(item, index) {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;
        count += item.quantity;

        const cartItem = document.createElement("div");

        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <h3>${item.name}</h3>

            <p>Price: ₹${item.price.toLocaleString("en-IN")}</p>

            <button class="decrease" data-index="${index}">-</button>

            <span>${item.quantity}</span>

            <button class="increase" data-index="${index}">+</button>

            <p>Subtotal: ₹${itemTotal.toLocaleString("en-IN")}</p>

            <button class="remove" data-index="${index}">Remove</button>
        `;

        cartItems.appendChild(cartItem);

    });

    totalPrice.textContent =
        "Total: ₹" + total.toLocaleString("en-IN");

    cartDisplay.textContent = count;

    localStorage.setItem("cart", JSON.stringify(cart));

}


// ========================================
// 6. ADD PRODUCTS TO CART
// ========================================

productContainer.addEventListener("click", function(e) {

    const productCard = e.target.closest(".product-card");

    if (!productCard) return;

    if (e.target.classList.contains("add-cart")) {

        const name = productCard.dataset.name;
        const price = Number(productCard.dataset.price);

        const existingProduct = cart.find(function(item) {
            return item.name === name;
        });

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        displayCart();

    }

});


// ========================================
// 7. INCREASE, DECREASE AND REMOVE CART ITEMS
// ========================================

cartItems.addEventListener("click", function(e) {

    const index = Number(e.target.dataset.index);

    if (e.target.classList.contains("increase")) {

        cart[index].quantity++;

    }

    else if (e.target.classList.contains("decrease")) {

        cart[index].quantity--;

        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }

    }

    else if (e.target.classList.contains("remove")) {

        cart.splice(index, 1);

    }

    displayCart();

});


// ========================================
// 8. SEARCH AND CATEGORY FILTER
// ========================================

function filterProducts() {

    const searchValue = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(function(product) {

        const matchesSearch =
            product.name.toLowerCase().includes(searchValue);

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });

    renderProducts(filteredProducts);

}


searchInput.addEventListener("input", filterProducts);


filterButtons.forEach(function(btn) {

    btn.addEventListener("click", function() {

        selectedCategory = btn.dataset.category;

        filterProducts();

    });

});


// ========================================
// 9. CHECKOUT BUTTON
// ========================================

const checkoutButton = document.getElementById("checkout-btn");
const checkoutForm = document.getElementById("checkout-form");

checkoutButton.addEventListener("click", function() {

    if (cart.length === 0) {

        alert("Your cart is empty. Please add products first.");

        return;

    }

    checkoutForm.style.display = "block";

});


// ========================================
// 10. DISPLAY ORDER HISTORY
// ========================================



function displayOrderHistory() {

    const orderHistoryList =
        document.getElementById("order-history-list");

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    orderHistoryList.innerHTML = "";

    if (orders.length === 0) {

        orderHistoryList.innerHTML =
            "<p>No previous orders found.</p>";

        return;

    }

    orders.forEach(function(order) {

        const orderCard = document.createElement("div");

        orderCard.classList.add("order-card");

        // Support old and new customer formats
        const customer = order.customer || {};

        const customerName =
            customer.name || order.customerName || "Not available";

        const customerEmail =
            customer.email || order.customerEmail || "Not available";

        const customerPhone =
            customer.phone || order.customerPhone || "Not available";

        const customerAddress =
            customer.address || order.customerAddress || "Not available";


        // Get products safely
        const orderProducts = Array.isArray(order.products)
            ? order.products
            : [];

        let productDetails = "";

        orderProducts.forEach(function(product) {

            const quantity = Number(product.quantity) || 1;
            const price = Number(product.price) || 0;

            productDetails += `
                <p>
                    ${product.name || "Product"} -
                    Quantity: ${quantity} -
                    Price: ₹${(price * quantity).toLocaleString("en-IN")}
                </p>
            `;

        });


        // Support total field and calculate if missing
        let orderTotal = Number(order.total);

        if (!Number.isFinite(orderTotal)) {

            orderTotal = orderProducts.reduce(function(sum, product) {

                return sum +
                    (Number(product.price) || 0) *
                    (Number(product.quantity) || 1);

            }, 0);

        }


        orderCard.innerHTML = `
            <h3>Order ID: ${order.orderId || "Not available"}</h3>

            <p>Customer: ${customerName}</p>

            <p>Email: ${customerEmail}</p>

            <p>Phone: ${customerPhone}</p>

            <p>Address: ${customerAddress}</p>

            <h4>Products:</h4>

            ${productDetails || "<p>No product details available.</p>"}

            <h3>Total: ₹${orderTotal.toLocaleString("en-IN")}</h3>

            <hr>
        `;

        orderHistoryList.appendChild(orderCard);

    });

}



// ========================================
// 11. PLACE ORDER
// ========================================

const orderForm = document.getElementById("order-form");

orderForm.addEventListener("submit", function(e) {

    e.preventDefault();

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }

    const customerName =
        document.getElementById("customer-name").value;

    const customerEmail =
        document.getElementById("customer-email").value;

    const customerPhone =
        document.getElementById("customer-phone").value;

    const customerAddress =
        document.getElementById("customer-address").value;


    const total = cart.reduce(function(sum, item) {

        return sum + item.price * item.quantity;

    }, 0);


    const order = {

        orderId: "SS" + Date.now(),

        customer: {
            name: customerName,
            email: customerEmail,
            phone: customerPhone,
            address: customerAddress
        },

        products: cart.map(function(item) {

            return {
                name: item.name,
                price: item.price,
                quantity: item.quantity
            };

        }),

        total: total

    };


    // Save order in LocalStorage

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.push(order);

    localStorage.setItem("orders", JSON.stringify(orders));


    // Display order confirmation

    document.getElementById("order-id").textContent =
        order.orderId;

    document.getElementById("order-customer").textContent =
        customerName;

    const orderedProducts =
        document.getElementById("ordered-products");

    orderedProducts.innerHTML = "";

    order.products.forEach(function(product) {

        const p = document.createElement("p");

        p.textContent =
            product.name +
            " x " +
            product.quantity +
            " = ₹" +
            (product.price * product.quantity).toLocaleString("en-IN");

        orderedProducts.appendChild(p);

    });


    document.getElementById("order-total").textContent =
        "Total: ₹" + total.toLocaleString("en-IN");


    document.getElementById("order-confirmation").style.display =
        "block";


    // Clear cart after successful order

    cart = [];

    displayCart();

    checkoutForm.style.display = "none";

    orderForm.reset();


    alert("Your order has been placed successfully!");

});


// ========================================
// 12. PRODUCT DETAILS MODAL
// ========================================

const productModal = document.getElementById("product-modal");

const closeModal = document.getElementById("close-modal");

productContainer.addEventListener("click", function(e) {

    if (e.target.classList.contains("details-btn")) {

        const productCard = e.target.closest(".product-card");

        const productId = Number(productCard.dataset.id);

        const selectedProduct = products.find(function(product) {

            return product.id === productId;

        });

        if (!selectedProduct) return;

        document.getElementById("modal-name").textContent =
            selectedProduct.name;

        document.getElementById("modal-image").src =
            selectedProduct.image;

        document.getElementById("modal-price").textContent =
            "Price: ₹" + selectedProduct.price.toLocaleString("en-IN");

        document.getElementById("modal-description").textContent =
            selectedProduct.description;

        productModal.style.display = "block";

    }

});


// Close modal using X button

closeModal.addEventListener("click", function() {

    productModal.style.display = "none";

});


// Close modal by clicking outside

window.addEventListener("click", function(e) {

    if (e.target === productModal) {

        productModal.style.display = "none";

    }

});


// ========================================
// 13. FETCH PRODUCTS FROM BACKEND API
// ========================================

const API_URL = "https://didactic-guide-q76pg9pp94xr299v-5000.app.github.dev/api/products";

fetch(API_URL)

    .then(function(response) {

        if (!response.ok) {

            throw new Error("Failed to fetch products");

        }

        return response.json();

    })

    .then(function(data) {

        console.log("Products received from backend:", data);

        products = data;

        renderProducts(products);

    })

    .catch(function(error) {

        console.log("Error fetching products:", error);

        productContainer.innerHTML =
            "<p>Unable to load products. Please check whether the backend server is running.</p>";

    });


// ========================================
// 14. VIEW / HIDE ORDER HISTORY
// ========================================

const historyButton = document.getElementById("history-btn");

const orderHistoryList =
    document.getElementById("order-history-list");


historyButton.addEventListener("click", function() {

    if (orderHistoryList.style.display === "none") {

        orderHistoryList.style.display = "block";

        // Load the latest saved orders when history is opened
        displayOrderHistory();

        historyButton.textContent = "Hide Order History";

    }

    else {

        orderHistoryList.style.display = "none";

        historyButton.textContent = "View Order History";

    }

});


// ========================================
// 15. INITIAL PAGE LOAD
// ========================================

displayCart();
