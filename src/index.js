const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const connectDB=require("./config/database");
// Import routes
const userRoutes = require("./routes/userRoutes");
const petRoutes = require("./routes/petRoutes");

// Import middleware
const errorHandler = require("./middleware/errorHandler");

const app = express();
const port = process.env.PORT || 3000;

// Create upload directories if they don't exist
const uploadDirs = ["uploads/images", "uploads/certificates"];
uploadDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Express.js API!",
    version: "1.0.0",
    endpoints: {
      users: "/api/users",
      pets: "/api/pets",
    },
  });
});

// API routes
app.use("/api/users", userRoutes);
app.use("/api/pets", petRoutes);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
connectDB();
// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
