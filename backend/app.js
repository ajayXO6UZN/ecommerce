const express = require("express");
const app = express();
const cors = require('cors');
const path = require("path");

const errorMiddleware = require("./middleware/error");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));

const category = require("./routes/category");
const product = require("./routes/product");
const user = require("./routes/user");

app.use("/api", category);
app.use("/api", product);
app.use("/api", user);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
