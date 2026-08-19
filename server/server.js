const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const dns = require("dns");

// Use reliable public DNS servers
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// Load .env from project root
dotenv.config({
  path: path.join(__dirname, "../.env"),
});

const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "HaatBazar API is running",
  });
});

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to HaatBazar API");
});

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
