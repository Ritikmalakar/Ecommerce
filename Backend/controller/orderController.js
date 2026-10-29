import Order from "../models/orderModels.js";

export async function createOrder(req, res) {
  try {
    const { items, address } = req.body;

    if (!items || items.length === 0 || !address) {
      return res.status(400).send({
        success: false,
        message: "Items and address are required",
      });
    }

    // Total Amount Calculate
    const totalAmount = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
      address,
    });

    res.status(201).send({
      success: true,
      message: "Order created successfully",
      order,
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

export async function getAllOrder(req, res) {
  try {
    const orders = await Order.find({
      user: req.user.id,
    })
      .populate("user", "name email")
      .populate("items.productId", "name price image");

    res.status(200).send({
      success: true,
      message: "Orders fetched successfully",
      orders,
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

export async function getOrderById(req, res) {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.productId", "name price image");

    if (!order) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Order fetched successfully",
      order,
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

export async function updateOrderStatus(req, res) {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status;
    await order.save();

    res.status(200).send({
      success: true,
      message: "Order status updated successfully",
      order,
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