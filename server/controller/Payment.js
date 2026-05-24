import Stripe from "stripe";
import Order from "../models/orderModels.js";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY
);

// =========================
// STRIPE PAYMENT
// =========================
export const stripePayment =
  async (req, res) => {

    try {

      const { products } =
        req.body;

      if (
        !products ||
        products.length === 0
      ) {

        return res
          .status(400)
          .send({
            success: false,
            message:
              "Products Missing"
          });
      }

      // Line Items
      const line_items =
        products.map(
          (p) => ({

            price_data: {

              currency:
                "inr",

              product_data: {
                name:
                  p.name
              },

              unit_amount:
                Number(
                  p.price
                ) * 100
            },

            quantity:
              p.qty || 1
          })
        );

      // Total
      const total =
        products.reduce(

          (sum, p) =>

            sum +

            Number(
              p.price
            ) *

            (p.qty || 1),

          0
        );

      // Stripe Session
      const session =
        await stripe
          .checkout
          .sessions
          .create({

            payment_method_types:
              ["card"],

            line_items,

            mode:
              "payment",

            // FIXED SUCCESS URL
            success_url:
              `${process.env.SECRET_USER}/orders?success=true&session_id={CHECKOUT_SESSION_ID}`,

            cancel_url:
              `${process.env.SECRET_USER}/cancel`
          });

      // Save Pending Order
      const order =
        await Order.create({

          products:
            products.map(
              (p) =>
                p._id
            ),

          buyer:
            req.user.id,

          amount:
            total,

          paymentStatus:
            "pending",

          stripeSessionId:
            session.id
        });

      return res
        .status(200)
        .send({

          success:
            true,

          url:
            session.url,

          order
        });

    } catch (error) {

      console.log(
        "Stripe Error:",
        error
      );

      return res
        .status(500)
        .send({

          success:
            false,

          message:
            error.message
        });
    }
};

// =========================
// PAYMENT STATUS
// =========================
export const paymentStatus =
  async (req, res) => {

    try {

      const {
        session_id
      } = req.query;

      if (
        !session_id
      ) {

        return res
          .status(400)
          .send({

            success:
              false,

            message:
              "Session ID Missing"
          });
      }

      // Get Stripe Session
      const session =
        await stripe
          .checkout
          .sessions
          .retrieve(
            session_id
          );

      // Update Order
      const order =
        await Order
          .findOneAndUpdate(

            {
              stripeSessionId:
                session_id
            },

            {
              paymentStatus:
                session.payment_status
            },

            {
              new: true
            }
          )
          .populate(
            "products"
          )
          .populate(
            "buyer",
            "name email"
          );

      if (!order) {

        return res
          .status(404)
          .send({

            success:
              false,

            message:
              "Order Not Found"
          });
      }

      return res
        .status(200)
        .send({

          success:
            true,

          payment_status:
            session.payment_status,

          order
        });

    } catch (error) {

      console.log(
        "Payment Status Error:",
        error
      );

      return res
        .status(500)
        .send({

          success:
            false,

          message:
            error.message
        });
    }
};

// =========================
// USER ORDERS
// =========================
export const userOrders =
  async (req, res) => {

    try {

      const orders =
        await Order.find({

          buyer:
            req.user.id
        })
          .populate(
            "products"
          )
          .populate(
            "buyer",
            "name email"
          )
          .sort({

            createdAt:
              -1
          });

      return res
        .status(200)
        .send({

          success:
            true,

          orders
        });

    } catch (error) {

      console.log(
        error
      );

      return res
        .status(500)
        .send({

          success:
            false,

          message:
            "Orders fetch failed"
        });
    }
};import Stripe from "stripe";
import Order from "../models/orderModels.js";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY
);

// =========================
// STRIPE PAYMENT
// =========================
export const stripePayment =
  async (req, res) => {

    try {

      const { products } =
        req.body;

      if (
        !products ||
        products.length === 0
      ) {

        return res
          .status(400)
          .send({
            success: false,
            message:
              "Products Missing"
          });
      }

      // Line Items
      const line_items =
        products.map(
          (p) => ({

            price_data: {

              currency:
                "inr",

              product_data: {
                name:
                  p.name
              },

              unit_amount:
                Number(
                  p.price
                ) * 100
            },

            quantity:
              p.qty || 1
          })
        );

      // Total
      const total =
        products.reduce(

          (sum, p) =>

            sum +

            Number(
              p.price
            ) *

            (p.qty || 1),

          0
        );

      // Stripe Session
      const session =
        await stripe
          .checkout
          .sessions
          .create({

            payment_method_types:
              ["card"],

            line_items,

            mode:
              "payment",

            // FIXED SUCCESS URL
            success_url:
              `${process.env.SECRET_USER}/orders?success=true&session_id={CHECKOUT_SESSION_ID}`,

            cancel_url:
              `${process.env.SECRET_USER}/cancel`
          });

      // Save Pending Order
      const order =
        await Order.create({

          products:
            products.map(
              (p) =>
                p._id
            ),

          buyer:
            req.user.id,

          amount:
            total,

          paymentStatus:
            "pending",

          stripeSessionId:
            session.id
        });

      return res
        .status(200)
        .send({

          success:
            true,

          url:
            session.url,

          order
        });

    } catch (error) {

      console.log(
        "Stripe Error:",
        error
      );

      return res
        .status(500)
        .send({

          success:
            false,

          message:
            error.message
        });
    }
};

// =========================
// PAYMENT STATUS
// =========================
export const paymentStatus =
  async (req, res) => {

    try {

      const {
        session_id
      } = req.query;

      if (
        !session_id
      ) {

        return res
          .status(400)
          .send({

            success:
              false,

            message:
              "Session ID Missing"
          });
      }

      // Get Stripe Session
      const session =
        await stripe
          .checkout
          .sessions
          .retrieve(
            session_id
          );

      // Update Order
      const order =
        await Order
          .findOneAndUpdate(

            {
              stripeSessionId:
                session_id
            },

            {
              paymentStatus:
                session.payment_status
            },

            {
              new: true
            }
          )
          .populate(
            "products"
          )
          .populate(
            "buyer",
            "name email"
          );

      if (!order) {

        return res
          .status(404)
          .send({

            success:
              false,

            message:
              "Order Not Found"
          });
      }

      return res
        .status(200)
        .send({

          success:
            true,

          payment_status:
            session.payment_status,

          order
        });

    } catch (error) {

      console.log(
        "Payment Status Error:",
        error
      );

      return res
        .status(500)
        .send({

          success:
            false,

          message:
            error.message
        });
    }
};

// =========================
// USER ORDERS
// =========================
export const userOrders =
  async (req, res) => {

    try {

      const orders =
        await Order.find({

          buyer:
            req.user.id
        })
          .populate(
            "products"
          )
          .populate(
            "buyer",
            "name email"
          )
          .sort({

            createdAt:
              -1
          });

      return res
        .status(200)
        .send({

          success:
            true,

          orders
        });

    } catch (error) {

      console.log(
        error
      );

      return res
        .status(500)
        .send({

          success:
            false,

          message:
            "Orders fetch failed"
        });
    }
};