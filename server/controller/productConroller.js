import { error } from "console";
import Product from "../models/productModel.js";
import fs from "fs";

export async function createProduct(req, res) {

  try {

    const {
      name,
      description,
      price,
      category,
      quantity,
      shipping
    } = req.fields;

    const { photo } = req.files || {};

    switch (true) {

      case !name:
        return res.status(400).send({
          success:false,
          message:"name is required"
        });

      case !description:
        return res.status(400).send({
          success:false,
          message:"description is required"
        });

      case !price:
        return res.status(400).send({
          success:false,
          message:"price is required"
        });

      case !category:
        return res.status(400).send({
          success:false,
          message:"category is required"
        });

      case !quantity:
        return res.status(400).send({
          success:false,
          message:"quantity is required"
        });

      case photo && photo.size > 1000000:
        return res.status(400).send({
          success:false,
          message:"Photo should be less than 1MB"
        });
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      quantity,
      shipping
    });

    if (photo) {

      product.photo.data =
        fs.readFileSync(photo.path);

      product.photo.contentType =
        photo.type;
    }

    await product.save();

    res.status(200).send({
      success:true,
      message:"Product created successfully",
      product
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success:false,
      message:"Error while creating product",
      error:error.message
    });
  }
}

export async function getAllProduct(req, res) {
  try {

    const product = await Product.find({}).populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "Products fetched successfully",
      product
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error while fetching products",
      error
    });

  }
}

export async function singleProduct(req,res){
  try{
    const product=await Product.findById(req.params.id)
    .populate("category")
     .select("-photo");
    res.status(200).send({
      success:true,
      message:"fetch",
      product
    }) 

  }catch(error){
    console.log(error);
    res.status(500).send({
      success:false,
      message:"error",
      error
    })
  }
}
export async function productPhoto(req,res){
  try{
    const product=await Product.findById(req.params.id).select('photo');

    if(product.photo.data){
      res.set("Content-type",product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }

  }catch(error){
    console.log(error);
    res.status(500).send({
      success:false,
      message:"error",
      error
    })
  }
}

export async function productPhotoUpdate(req,res){
  const product=await Product.findByIdAndUpdate(req.params.id,)
}

export async function deleteProduct(req,res){
  try{
const product=await Product.findByIdAndDelete(req.params.id);
res.status(200).send({
  success:true,
  message:"deleted successfully"
})
  }catch(error){
    console.log(error);
    res.status(500).send({
      success:false,
      message:"error",
      error
    })
  }
}

export async function updateProduct(req,res){
  try{
    const { name, description, price, category, quantity, shipping } = req.fields;
    const { photo } = req.files;

    switch (true) {

      case !name:
        return res.status(500).send({
          error: "name is required"
        });

      case !description:
        return res.status(500).send({
          error: "description is required"
        });

      case !price:
        return res.status(500).send({
          error: "price is required"
        });

      case !category:
        return res.status(500).send({
          error: "category is required"
        });

      case !quantity:
        return res.status(500).send({
          error: "quantity is required"
        });

      case photo && photo.size > 1000000:
        return res.status(500).send({
          error: "Photo should be less than 1MB"
        });
    }

const product=await Product.findByIdAndUpdate(req.params.id, {...req.fields},{new:true});

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();

    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product
    });


  }catch(error){
    console.log(error);
    res.status(500).send({
      success:false,
      message:"error",
      error
    })
  }
}

export async function productFilter(req, res) {
  try {

    const { checked, radio } = req.body;
    let arg = {};

    // Category Filter
    if (checked.length > 0) {
      arg.category = checked;
    }

    // Price Filter
    if (radio.length > 0) {
      arg.price = {
        $gte: radio[0],
        $lte: radio[1]
      };
    }

    const product = await Product.find(arg);

    res.status(200).send({
      success: true,
      product
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error",
      error
    });
  }
}


export async function searchProduct(req, res) {
  try {

    const { keyword } = req.params;

    const product = await Product.find({
      $or: [
        {
          name: {
            $regex: keyword,
            $options: "i"
          }
        },
        {
          description: {
            $regex: keyword,
            $options: "i"
          }
        }
      ]
    }).select("-photo");

    res.status(200).send({
      success: true,
      product
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Search",
      error
    });
  }
}