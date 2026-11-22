
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

const cartButtons = document.querySelectorAll(".add-cart");
const cartDisplay = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");


// ========================================
// 3. DISPLAY CART
// ========================================

function displayCart() {

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    }

    for (let i = 0; i < cart.length; i++) {

        let itemTotal = cart[i].price * cart[i].quantity;

        total = total + itemTotal;
        count = count + cart[i].quantity;

        const div = document.createElement("div");

        div.classList.add("cart-item");

        div.innerHTML = `
            <span>${cart[i].name}</span>
            <span>₹${cart[i].price}</span>

            <button class="decrease-btn" data-index="${i}">−</button>

            <span>${cart[i].quantity}</span>

            <button class="increase-btn" data-index="${i}">+</button>

            <span>₹${itemTotal}</span>

            <button class="remove-btn" data-index="${i}">Remove</button>
        `;

        cartItems.appendChild(div);
    }

    totalPrice.innerText = "Total: ₹" + total;

    cartDisplay.innerText = count;

    // Save cart in LocalStorage
    localStorage.setItem("cart", JSON.stringify(cart));
}


// ========================================
// 4. ADD PRODUCTS TO CART
// ========================================

cartButtons.forEach(function(btn) {

    btn.addEventListener("click", function() {

        const product = btn.parentElement;

        const name = product.dataset.name;
        const price = Number(product.dataset.price);

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

    });

});


// ========================================
// 5. INCREASE, DECREASE AND REMOVE PRODUCTS
// ========================================

cartItems.addEventListener("click", function(e) {

    const index = Number(e.target.dataset.index);

    if (e.target.classList.contains("increase-btn")) {

        cart[index].quantity++;

    }

    else if (e.target.classList.contains("decrease-btn")) {

        cart[index].quantity--;

        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }

    }

    else if (e.target.classList.contains("remove-btn")) {

        cart.splice(index, 1);

    }

    else {
        return;
    }

    displayCart();

});


// Display cart when page loads
displayCart();


// ========================================
// 6. SEARCH AND CATEGORY FILTER
// ========================================

const searchInput = document.getElementById("searchInput");

const productCards = document.querySelectorAll(".product-card");

const filterButtons = document.querySelectorAll(".filter-btn");

let selectedCategory = "all";


function filterProducts() {

    const searchValue = searchInput.value.toLowerCase();

    productCards.forEach(function(product) {

        const productName = product.dataset.name.toLowerCase();

        const productCategory = product.dataset.category;

        const matchesSearch = productName.includes(searchValue);

        const matchesCategory =
            selectedCategory === "all" ||
            productCategory === selectedCategory;

        if (matchesSearch && matchesCategory) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

}


// Search event
searchInput.addEventListener("input", filterProducts);


// Category filter event
filterButtons.forEach(function(btn) {

    btn.addEventListener("click", function() {

        selectedCategory = btn.dataset.category;

        filterProducts();

    });

});


// ========================================
// 7. CHECKOUT BUTTON
// ========================================

const checkoutBtn = document.getElementById("checkout-btn");

const checkoutForm = document.getElementById("checkout-form");


checkoutBtn.addEventListener("click", function() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }

    checkoutForm.style.display = "block";

    checkoutForm.scrollIntoView({
        behavior: "smooth"
    });

});


// ========================================
// 8. DISPLAY ORDER HISTORY
// ========================================

function displayOrderHistory() {

    const historyList = document.getElementById("order-history-list");

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    historyList.innerHTML = "";

    if (orders.length === 0) {

        historyList.innerHTML = "<p>No previous orders found.</p>";

        return;

    }

    for (let i = 0; i < orders.length; i++) {

        const orderCard = document.createElement("div");

        orderCard.className = "order-card";

        const heading = document.createElement("h3");

        heading.textContent = "Order ID: " + orders[i].orderId;

        const customer = document.createElement("p");

        customer.textContent = "Customer: " + orders[i].customerName;

        const total = document.createElement("p");

        total.textContent = "Total Amount: ₹" + orders[i].totalAmount;

        orderCard.appendChild(heading);

        orderCard.appendChild(customer);

        orderCard.appendChild(total);

        historyList.appendChild(orderCard);

    }

}


// ========================================
// 9. PLACE ORDER
// ========================================

const orderForm = document.getElementById("order-form");


orderForm.addEventListener("submit", function(e) {

    e.preventDefault();

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }

    // Get customer details
    const customerName = document.getElementById("customer-name").value;

    const customerEmail = document.getElementById("customer-email").value;

    const customerPhone = document.getElementById("customer-phone").value;

    const customerAddress = document.getElementById("customer-address").value;


    // Generate unique order ID
    const orderId = "SS" + Date.now();


    // Create order object
    const orderDetails = {

        orderId: orderId,

        customerName: customerName,

        customerEmail: customerEmail,

        customerPhone: customerPhone,

        customerAddress: customerAddress,

        products: cart.map(function(item) {

            return {
                name: item.name,
                price: item.price,
                quantity: item.quantity
            };

        }),

        totalAmount: cart.reduce(function(total, item) {

            return total + item.price * item.quantity;

        }, 0)

    };


    // Get previous orders
    let orders = JSON.parse(localStorage.getItem("orders")) || [];


    // Add new order
    orders.push(orderDetails);


    // Save orders in LocalStorage
    localStorage.setItem("orders", JSON.stringify(orders));


    // Update order history immediately
    displayOrderHistory();


    // ========================================
    // DISPLAY ORDER CONFIRMATION
    // ========================================

    document.getElementById("order-id").textContent = orderDetails.orderId;

    document.getElementById("order-customer").textContent = orderDetails.customerName;


    const orderedProducts = document.getElementById("ordered-products");

    orderedProducts.innerHTML = "";


    orderDetails.products.forEach(function(item) {

        const product = document.createElement("div");

        product.className = "ordered-item";

        product.textContent =
            item.name + " - ₹" + item.price +
            " x " + item.quantity +
            " = ₹" + (item.price * item.quantity);

        orderedProducts.appendChild(product);

    });


    document.getElementById("order-total").textContent =
        "Total Amount: ₹" + orderDetails.totalAmount;


    // Show confirmation section
    document.getElementById("order-confirmation").style.display = "block";


    // Clear cart
    cart = [];

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();


    // Hide and reset checkout form
    checkoutForm.style.display = "none";

    orderForm.reset();


    // Scroll to confirmation
    document.getElementById("order-confirmation").scrollIntoView({
        behavior: "smooth"
    });

});


// ========================================
// 10. SHOW PREVIOUS ORDERS WHEN PAGE LOADS
// ========================================

displayOrderHistory();


// ========================================
// 11. PRODUCT DETAILS MODAL
// ========================================

const detailsButtons = document.querySelectorAll(".details-btn");

const modal = document.getElementById("product-modal");

const closeModal = document.getElementById("close-modal");

const modalName = document.getElementById("modal-name");

const modalImage = document.getElementById("modal-image");

const modalPrice = document.getElementById("modal-price");

const modalDescription = document.getElementById("modal-description");


detailsButtons.forEach(function(btn) {

    btn.addEventListener("click", function() {

        const product = btn.parentElement;

        const name = product.dataset.name;

        const price = product.dataset.price;

        const image = product.querySelector("img").src;


        modalName.textContent = name;

        modalPrice.textContent = "Price: ₹" + price;

        modalImage.src = image;

        modalDescription.textContent =
            "Explore our " + name + ". Order now from Shop Swift!";


        modal.style.display = "block";

    });

});


// Close modal using close button
closeModal.addEventListener("click", function() {

    modal.style.display = "none";

});


// Close modal by clicking outside it
window.addEventListener("click", function(e) {

    if (e.target === modal) {

        modal.style.display = "none";

    }

});
