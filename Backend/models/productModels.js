import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  stock:{
    type:String,
    required:true
  },
  image:{
    type:String,

  },
  rating:{
    type:Number,
    default:0
  },
  reviews:{
    type:String,
    default:0
  }

},{timestamps:true})

const Product=mongoose.model("Product",productSchema);
export default Product;