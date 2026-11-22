
const cors = require("cors");

// ========================================
// 1. IMPORT EXPRESS
// ========================================

const express = require("express");


// ========================================
// 2. CREATE EXPRESS APP
// ========================================

const app = express();
app.use(cors());

const PORT = 5000;


// ========================================
// 3. MIDDLEWARE
// ========================================

app.use(express.json());


// ========================================
// 4. HOME ROUTE
// ========================================

app.get("/", function(req, res) {

    res.send("Welcome to Shop Swift Backend!");

});


// ========================================
// 5. PRODUCTS DATA
// ========================================


const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1999,
        category: "electronics",
        image: "https://placehold.co/300x200?text=Headphones",
        description: "High-quality wireless headphones with clear sound."
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 2499,
        category: "accessories",
        image: "https://placehold.co/300x200?text=Smart+Watch",
        description: "Smart watch with useful fitness and health tracking features."
    },
    {
        id: 3,
        name: "Sports Shoes",
        price: 1799,
        category: "fashion",
        image: "https://placehold.co/300x200?text=Sports+Shoes",
        description: "Comfortable sports shoes for everyday activities."
    },
    {
        id: 4,
        name: "Travel Backpack",
        price: 999,
        category: "fashion",
        image: "https://placehold.co/300x200?text=Backpack",
        description: "Spacious backpack for travel and daily use."
    }
];


// ========================================
// 6. GET ALL PRODUCTS API
// ========================================

app.get("/api/products", function(req, res) {

    res.json(products);

});


// ========================================
// 7. START SERVER
// ========================================

app.listen(PORT, function() {

    console.log(`Shop Swift server is running on port ${PORT}`);

});
