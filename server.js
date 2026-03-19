const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- MOCK DATA ---
const products = [
    { id: 1, name: "Minimalist Watch", price: 129.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80" },
    { id: 2, name: "Leather Backpack", price: 89.50, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80" },
    { id: 3, name: "Wireless Headphones", price: 199.00, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80" },
    { id: 4, name: "Running Sneakers", price: 75.00, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80" },
    { id: 5, name: "Polarized Sunglasses", price: 45.00, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80" },
    { id: 6, name: "Smart Speaker", price: 59.99, image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=400&q=80" },
    { id: 7, name: "Denim Jacket", price: 65.00, image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=400&q=80" },
    { id: 8, name: "Ceramic Coffee Mug", price: 15.00, image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=400&q=80" },
];

const orders = [];

// --- API ENDPOINTS ---
app.get('/products', (req, res) => {
    setTimeout(() => {
        res.json({ success: true, count: products.length, products });
    }, 200);
});

app.post('/orders', (req, res) => {
    const { customer, items, total } = req.body;
    if (!customer || !items || items.length === 0) {
        return res.status(400).json({ success: false, message: "Invalid order data. Customer and items are required." });
    }
    const newOrder = { id: Date.now(), date: new Date().toISOString(), customer, items, total, status: 'pending' };
    orders.push(newOrder);
    console.log(`New Order Received: #${newOrder.id} from ${customer.name}`);
    res.status(201).json({ success: true, message: "Order placed successfully", newOrder });
});

app.get('/orders', (req, res) => {
    res.json({ success: true, count: orders.length, orders });
});

// --- SERVER STARTUP ---
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log("API Endpoints:");
    console.log("  GET  /products");
    console.log("  POST /orders");
    console.log("  GET  /orders");
});
