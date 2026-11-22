# 🛒 Shop Swift – Full Stack E-Commerce Website

Shop Swift is a web-based e-commerce application that allows users to browse products, search and filter items, manage their shopping cart, and place orders through a simple and user-friendly interface.

The project is being developed using **HTML, CSS, JavaScript, Node.js, and Express.js**, with the goal of building a complete full-stack e-commerce application.

## 🚀 Features

- **Product Listing:** Dynamically fetch and display products from the backend API.
- **Product Search:** Search for products by name.
- **Category Filtering:** Filter products by categories such as Electronics, Fashion, and Accessories.
- **Product Details:** View product images, prices, and descriptions.
- **Shopping Cart:** Add, remove, increase, and decrease product quantities.
- **Cart Persistence:** Maintain cart data using LocalStorage.
- **Checkout System:** Collect customer details and place orders.
- **Order Confirmation:** Generate a unique order ID after placing an order.
- **Order History:** View previously placed orders.

## 🛠️ Tech Stack

**Frontend**
- HTML5
- CSS3
- JavaScript

**Backend**
- Node.js
- Express.js
- REST API

**Storage**
- Browser LocalStorage (cart and order history)

**Deployment**
- Vercel (Frontend)
- GitHub (Source Code)

## 📁 Project Structure

```text
Shop-Swift-Full-Stack-E-commerce-Website/
│
├── shop-Swift/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── backend/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## ⚙️ How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/RajK123-hub/Shop-Swift-Full-Stack-E-commerce-Website.git
```

### 2. Start the backend

```bash
cd Shop-Swift-Full-Stack-E-commerce-Website/backend
npm install
node server.js
```

The backend runs on port `5000`.

### 3. Configure the frontend API

In `shop-Swift/script.js`, configure `API_URL` with the URL of your running backend API:

```javascript
const API_URL = "YOUR_BACKEND_API_URL/api/products";
```

### 4. Run the frontend

Open `shop-Swift/index.html` using VS Code Live Server.

## 🌐 Deployment

The frontend is deployed using Vercel.

The backend currently runs through GitHub Codespaces and needs to be running for the deployed frontend to fetch products.

## 🔮 Future Improvements

- MongoDB database integration.
- Permanent backend deployment.
- Persistent product and order storage.
- User authentication and registration.
- Secure payment gateway integration.
- Admin dashboard for product and order management.

## 👨‍💻 Author

**Raj Kiran Singh**

B.Tech – Computer Science and Engineering

Chandigarh University | 2023–2027

GitHub: [RajK123-hub](https://github.com/RajK123-hub)

---

⭐ If you find this project interesting, feel free to explore the repository!