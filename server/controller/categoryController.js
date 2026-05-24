import Category from "../models/categoryModel.js";


export async function createCategory(req, res) {

  try {

    const { name } = req.body;

    if (!name) {

      return res.status(400).send({
        success: false,
        message: "Name is required"
      });

    }

    const existCate = await Category.findOne({ name });

    if (existCate) {

      return res.status(400).send({
        success: false,
        message: "Category already exists"
      });

    }

    const category = await Category.create({ name });

    res.status(201).send({
      success: true,
      message: "Category Created",
      category
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error in category",
      error
    });

  }
}

export async function updateCategory(req,res){
  try{

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new:true }
    );

    res.status(200).send({
      success:true,
      message:"updated successfully",
      category
    });

  }catch(error){

    console.log(error);

    res.status(500).send({
      success:false,
      message:"error"
    });
  }
}

export async function categoryAll(req,res){
  try{
const category=await Category.find({});
res.status(200).send({
  success:true,
  message:"fetch",
  category
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

export async function singleCategory(req, res) {
  try {

    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found"
      });
    }

    res.status(200).send({
      success: true,
      message: "Category fetched successfully",
      category
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error in single category API",
      error
    });

  }
}

export async function deleteCategory(req,res){
  try{
const category=await Category.findByIdAndDelete(req.params.id);
res.status(200).send({
  success:true,
  message:"deleted successfully",
  category
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