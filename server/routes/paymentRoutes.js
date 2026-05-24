import express from "express";
import {
  stripePayment,
  paymentStatus,
  userOrders
} from "../controller/Payment.js";

import {
  authUser
} from "../middleware/auth.js";

const router =
  express.Router();

router.post(
  "/stripe-payment",
  authUser,
  stripePayment
);

router.get(
  "/payment-status",
  paymentStatus
);

router.get(
  "/my-orders",
  authUser,
  userOrders
);

export default router;