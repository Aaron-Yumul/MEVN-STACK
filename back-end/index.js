require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./database/db");
const studentRoute = require("./routes/student.route");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routes under /api
app.use("/api", studentRoute);

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error("💥 [Server Error]:", err.message);

  // Invalid 24-character ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: `Invalid ID format: '${err.value}' is not a valid 24-character hex ObjectId.`,
    });
  }

  // Mongoose schema validation errors
  if (err.name === "ValidationError") {
    const errorMessages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      success: false,
      message: "Validation Failed",
      errors: errorMessages,
    });
  }

  // Malformed JSON in the request body
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      success: false,
      message: "Request body contains invalid JSON.",
    });
  }

  return res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
