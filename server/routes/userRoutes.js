import express from "express";

import {
  allOrders,
  deleteOrder,
  allUser,
  chagePass,
  forgetPassword,
  login,
  register,
  updateAddress,
  verifyOtp
}
from "../controller/userController.js";

import {
  authUser,
  adminUser
}
from "../middleware/auth.js";

const router =
  express.Router();

router.post(
  "/register",
  register
);

router.post(
  "/login",
  login
);

router.post(
  "/forget",
  forgetPassword
);

router.post(
  "/verify/:email",
  verifyOtp
);

router.post(
  "/changePass/:email",
  chagePass
);

router.post(
  "/update-address",
  authUser,
  updateAddress
);

router.get(
  "/all",
  authUser,
  adminUser,
  allUser
);

router.get(
  "/all-orders",
  authUser,
  adminUser,
  allOrders
);

// DELETE ORDER
router.delete(
  "/delete-order/:id",
  authUser,
  adminUser,
  deleteOrder
);

export default router;