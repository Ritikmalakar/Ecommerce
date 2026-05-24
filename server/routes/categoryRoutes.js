import express from 'express';
import { adminUser, authUser } from '../middleware/auth.js';
import { categoryAll, createCategory, deleteCategory, singleCategory, updateCategory } from '../controller/categoryController.js';

const router=express.Router();
router.post("/cate",authUser,adminUser,createCategory);
router.post("/update/:id",authUser,adminUser,updateCategory);
router.get("/getAll",categoryAll);
router.get("/single/:id",singleCategory);
router.post("/delete/:id",authUser,adminUser,deleteCategory)
export default router; 