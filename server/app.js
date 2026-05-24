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

const app =
  express();

app.use(
  express.json()
);

app.use(
  cookieParser()
);

app.use(
  cors({
    origin:
      "http://localhost:5173",
    credentials:
      true
  })
);

// Routes
app.use(
  "/user",
  userRoutes
);

app.use(
  "/category",
  categoryRoutes
);

app.use(
  "/product",
  productRoutes
);

app.use(
  "/stripe",
  paymentRoutes
);

// Start Server
async function
startServer() {

  try {

    await connectDb();

    app.listen(
      process.env.PORT,
      () => {

        console.log(
          "server started"
        );
      }
    );

  } catch (err) {

    console.log(
      err
    );
  }
}

startServer();