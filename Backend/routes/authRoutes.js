import express from 'express';
import { getUser, login, register } from '../controller/authController.js';
import { authUser } from '../middlewate/auth.js';
import { adminUser } from '../middlewate/admin.js';

const router=express.Router();
router.post("/register",register);
router.post("/login",login);
router.get("/getUser",authUser,adminUser,getUser)
export default router;