const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Initialize dotenv to load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Database connection (make sure the connection script is correct)
require('./conn/conn');

// Importing route handlers
const User = require("./routes/user");
const Books = require("./routes/book");
const Favourite = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");
const CreateOrder = require("./routes/RazorPay");
const paymentRoutes = require("./routes/paymentRoutes");

// Set port
const port = process.env.PORT || 3000;

// Middleware to parse incoming JSON data
app.use(express.json());

// Enable CORS for the frontend application
app.use(cors({
    origin: ['http://localhost:5173', 'https://book-store-frontend-pied-nine.vercel.app'],
    credentials: true
}));

// Handle preflight OPTIONS requests for CORS
app.options('*', cors());

// Define your routes
app.use("/api/v1", User);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);
app.use("/api/v1", CreateOrder);
app.use("/api/v1", paymentRoutes);

// Basic health check endpoint
app.get("/", (req, res) => {
    res.send("Hello from Backend");
});

// Centralized error handling for unexpected errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

// Gracefully handle 404 errors
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Start the server
app.listen(port, () => {
    console.log(`Server Started at port: ${port}`);
});
