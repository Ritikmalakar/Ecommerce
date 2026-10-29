// routes/paymentRoutes.js

import express from "express";
import { createPaymentIntent } from "../controller/paymentController.js";


const router = express.Router();

router.post("/payment", createPaymentIntent);

export default router;