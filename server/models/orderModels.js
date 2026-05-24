import mongoose from "mongoose";

const orderSchema =
  new mongoose.Schema(
    {
      products: [
        {
          type:
            mongoose.Schema.Types.ObjectId,
          ref:
            "Product",
        },
      ],

      buyer: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref:
          "User",
        required:
          true,
      },

      amount: {
        type:
          Number,
        required:
          true,
      },

      paymentStatus: {
        type:
          String,
        default:
          "pending",
      },

      stripeSessionId: {
        type:
          String,
      },
    },
    {
      timestamps: true,
    }
  );

const Order =
  mongoose.models.Order ||
  mongoose.model(
    "Order",
    orderSchema
  );

export default Order;