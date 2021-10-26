const express = require("express");
const app = express();
const cors = require('cors');
const path = require("path");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const category = require("./routes/category");

app.use("/api", category);

app.use(express.json());

module.exports = app;
