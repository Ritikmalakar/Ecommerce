import express from 'express'
import { createProduct, deleteProduct, getProduct, getProductOne, updateProduct } from '../controller/productController.js';
import upload from '../middlewate/upload.js';
import { authUser } from '../middlewate/auth.js';
import { adminUser } from '../middlewate/admin.js';

const router=express.Router();
router.post("/create",authUser,adminUser,upload.single('image'),createProduct);
router.get("/getAll",getProduct);
router.put("/update/:id",authUser,adminUser,upload.single('image'),updateProduct);
router.get("/getOne/:id",getProductOne);
router.delete("/delete/:id",authUser,adminUser,deleteProduct);
export default router;