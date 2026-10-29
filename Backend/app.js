import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import { connectDb } from './config/db.js';
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import cookieParser from 'cookie-parser'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import analyticsRoutes from './routes/analyticsRoutes.js'
const app=express();
app.use(express.json());
app.use(cors({
  origin:process.env.SECRET_USER,
  credentials:true
}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use("/user",authRoutes);
app.use("/product",productRoutes)
app.use("/order",orderRoutes)
app.use("/payment",paymentRoutes)
app.use("/analytic",analyticsRoutes)
async function startServer(req,res) {
  try{
await connectDb();
app.listen(process.env.PORT,()=>{
  console.log("server start");
})
  }catch(error){
    console.log(error)
  }
  
}
startServer();