import express from 'express';
import { getAdminStats } from '../controller/analyticController.js';
import { authUser } from '../middlewate/auth';
import { adminUser } from '../middlewate/admin';

const router=express.Router();
router.get("/data",authUser,adminUser,getAdminStats);
export default router;