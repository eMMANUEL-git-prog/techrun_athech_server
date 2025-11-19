const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // your frontend
    credentials: true, // allow cookies, auth headers
  })
);
app.use(express.json());

// Register all API routes at once
app.use("/api", routes);

// Global error handler (should be last)
app.use(errorHandler);

module.exports = app;
