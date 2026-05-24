import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDb } from "./config/db.js";

// IMPORTANT
import "./models/userModels.js";
import "./models/orderModels.js";

import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/ProductRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

// CORS FIX
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://quick-mart-unqa.onrender.com"
    ],
    credentials: true
  })
);

// Routes
app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/stripe", paymentRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// Start Server
async function startServer() {
  try {
    await connectDb();

    app.listen(process.env.PORT, () => {
      console.log("server started");
    });

  } catch (err) {
    console.log(err);
  }
}

startServer();