import express from 'express'
import { createOrder, getAllOrder, getOrderById, updateOrderStatus,  } from '../controller/orderController.js';
import { authUser } from '../middlewate/auth.js';
import { adminUser } from '../middlewate/admin.js';

const router=express.Router();
router.post("/createOrder",authUser,adminUser,createOrder)
router.get("/getAll",authUser,adminUser,getAllOrder);
router.get("/getOrderId/:id",authUser,getOrderById);
router.post("/status/:id",authUser,adminUser,updateOrderStatus);
export default router;