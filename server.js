const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// API 1: Home
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to My API Server!"
    });
});

// API 2: Health Check
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        status: "Server is running",
        uptime: process.uptime()
    });
});

// API 3: Get All Users
app.get("/api/users", (req, res) => {
    const users = [
        { id: 1, name: "Ali", email: "ali@example.com" },
        { id: 2, name: "Ahmed", email: "ahmed@example.com" },
        { id: 3, name: "Sara", email: "sara@example.com" }
    ];

    res.json({
        success: true,
        data: users
    });
});

// API 4: Get User By ID
app.get("/api/users/:id", (req, res) => {
    const users = [
        { id: 1, name: "Ali", email: "ali@example.com" },
        { id: 2, name: "Ahmed", email: "ahmed@example.com" },
        { id: 3, name: "Sara", email: "sara@example.com" }
    ];

    const user = users.find(
        u => u.id === Number(req.params.id)
    );

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    res.json({
        success: true,
        data: user
    });
});

// API 5: Create User
app.post("/api/users", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: "Name and email are required"
        });
    }

    const newUser = {
        id: Date.now(),
        name,
        email
    };

    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: newUser
    });
});

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found"
    });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});