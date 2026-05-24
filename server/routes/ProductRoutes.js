import express from 'express';
import { createProduct, deleteProduct, getAllProduct, productFilter, productPhoto, searchProduct, singleProduct, updateProduct } from '../controller/productConroller.js';
import formidable from "express-formidable";
import { adminUser, authUser } from '../middleware/auth.js';
const router=express.Router();
router.post("/createProduct",authUser,adminUser,formidable(),createProduct);
router.get("/getAll",getAllProduct)
router.get("/single/:id",singleProduct)
router.get("/product-photo/:id",productPhoto)

router.post("/delete/:id",authUser,adminUser,deleteProduct)
router.post("/update/:id",authUser,adminUser,formidable(),updateProduct)
router.post("/filter",productFilter)
router.get(
  "/search/:keyword",
  searchProduct
)
export default router;