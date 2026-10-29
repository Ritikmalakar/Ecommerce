import Product from "../models/productModels.js";

// Create Product
export async function createProduct(req, res) {
  try {
    const formData = { ...req.body };

    if (req.file) {
      formData.image = req.file.path;
    }

    const product = await Product.create(formData);

    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: error.message,
      error,
    });
  }
}

// Get All Products
export async function getProduct(req, res) {
  try {
    const products = await Product.find({});

    res.status(200).send({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: error.message,
      error,
    });
  }
}

// Get Single Product
export async function getProductOne(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: error.message,
      error,
    });
  }
}

// Update Product
export async function updateProduct(req, res) {
  try {
    const formData = { ...req.body };

    if (req.file) {
      formData.image = req.file.path;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      formData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: error.message,
      error,
    });
  }
}

// Delete Product
export async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: error.message,
      error,
    });
  }
}