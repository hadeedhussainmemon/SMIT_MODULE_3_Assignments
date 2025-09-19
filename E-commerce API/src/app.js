const express = require("express");
const connectDB = require("./config/database.js")
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());

// Use routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);

// DB + server
connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((err) => console.error("DB connection error:", err));
