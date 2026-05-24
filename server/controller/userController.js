import User from "../models/userModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendOtpMail } from "../verify/otpVerify.js";
import Order from "../models/orderModels.js";

// REGISTER
export async function register(req, res) {
  try {

    const userData = {
      ...req.body
    };

    if (
      !userData.name ||
      !userData.email ||
      !userData.password ||
      !userData.address ||
      !userData.phone
    ) {
      return res.status(401).send({
        success: false,
        message: "all fields required"
      });
    }

    const existUser =
      await User.findOne({
        email:
          userData.email
      });

    if (existUser) {
      return res.status(400).send({
        success: false,
        message:
          "user already exist"
      });
    }

    userData.password =
      await bcrypt.hash(
        userData.password,
        10
      );

    const user =
      await User.create(
        userData
      );

    user.password =
      undefined;

    res.status(201).send({
      success: true,
      message:
        "registration successfully",
      user
    });

  } catch (err) {

    console.log(err);

    res.status(500).send({
      success: false,
      message:
        "server error",
      err
    });
  }
}

// LOGIN
// LOGIN
export async function login(req, res) {

  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "all field required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "user not found"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid credential"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "7d"
      }
    );

    // REMOVE PASSWORD
    user.password = undefined;

    // COOKIE FIX FOR HOSTING
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "None"
    });

    return res.status(200).send({
      success: true,
      message: "login successfully",
      token,
      user
    });

  } catch (err) {

    console.log(err);

    return res.status(500).send({
      success: false,
      message: "error",
      err
    });
  }
}
// FORGET PASSWORD
export async function forgetPassword(req, res) {

  try {

    const {
      email
    } = req.body;

    if (!email) {
      return res.status(400).send({
        success: false,
        message:
          "Email is required"
      });
    }

    const user =
      await User.findOne({
        email
      });

    if (!user) {
      return res.status(404).send({
        success: false,
        message:
          "User not found"
      });
    }

    const otp =
      Math.floor(
        100000 +
        Math.random() *
        900000
      );

    const otpExpiry =
      new Date(
        Date.now() +
        10 * 60 * 1000
      );

    user.otp = otp;
    user.otpExpiry =
      otpExpiry;

    await user.save();

    await sendOtpMail(
      otp,
      email
    );

    return res.status(200).send({
      success: true,
      message:
        "OTP sent successfully"
    });

  } catch (err) {

    console.log(err);

    return res.status(500).send({
      success: false,
      message:
        "Internal server error"
    });
  }
}

// VERIFY OTP
export async function verifyOtp(req, res) {

  try {

    const {
      otp
    } = req.body;

    const email =
      decodeURIComponent(
        req.params.email
      );

    if (!otp) {
      return res.status(400).send({
        success: false,
        message:
          "otp is required"
      });
    }

    const user =
      await User.findOne({
        email
      });

    if (!user) {
      return res.status(401).send({
        success: false,
        message:
          "user not found"
      });
    }

    if (
      user.otpExpiry <
      new Date()
    ) {
      return res.status(401).send({
        success: false,
        message:
          "otp is expire"
      });
    }

    if (
      Number(otp) !==
      Number(user.otp)
    ) {
      return res.status(401).send({
        success: false,
        message:
          "invalid otp"
      });
    }

    user.otp = null;
    user.otpExpiry =
      null;

    await user.save();

    res.status(200).send({
      success: true,
      message:
        "otp verify successfully"
    });

  } catch (err) {

    console.log(err);

    res.status(500).send({
      success: false,
      message:
        "error"
    });
  }
}

// CHANGE PASSWORD
export async function chagePass(req, res) {

  try {

    const {
      newPass,
      confirmPass
    } = req.body;

    const email =
      decodeURIComponent(
        req.params.email
      );

    const user =
      await User.findOne({
        email
      });

    if (!user) {
      return res.status(404).send({
        success: false,
        message:
          "User not found"
      });
    }

    if (
      !newPass ||
      !confirmPass
    ) {
      return res.status(400).send({
        success: false,
        message:
          "All fields required"
      });
    }

    if (
      newPass !==
      confirmPass
    ) {
      return res.status(400).send({
        success: false,
        message:
          "Passwords do not match"
      });
    }

    user.password =
      await bcrypt.hash(
        newPass,
        10
      );

    await user.save();

    return res.status(200).send({
      success: true,
      message:
        "Password changed successfully"
    });

  } catch (err) {

    console.log(err);

    return res.status(500).send({
      success: false,
      message:
        "Internal server error"
    });
  }
}

// ALL USERS
export async function allUser(req, res) {

  try {

    const user =
      await User.find({});

    res.status(200).send({
      success: true,
      message:
        "fetch",
      user
    });

  } catch (err) {

    console.log(err);

    res.status(500).send({
      success: false,
      message:
        "error"
    });
  }
}

// UPDATE ADDRESS
export async function updateAddress(req, res) {

  try {

    const {
      id,
      address
    } = req.body;

    const user =
      await User.findByIdAndUpdate(
        id,
        {
          address
        },
        {
          new: true
        }
      );

    res.status(200).send({
      success: true,
      message:
        "Address Updated",
      user
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      message:
        "Error in update",
      error
    });
  }
}

// ALL ORDERS
export const allOrders = async (req, res) => {
  try {

    const orders =
      await Order.find({})
        .populate("buyer")
        .populate("products")
        .sort({
          createdAt: -1
        });

    res.status(200).send({
      success: true,
      orders
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      message:
        "Error in Orders"
    });
  }
};

export const deleteOrder =
  async (req, res) => {

    try {

      const {
        id
      } = req.params;

      await Order.findByIdAndDelete(
        id
      );

      res.status(200).send({
        success: true,
        message:
          "Order Deleted"
      });

    } catch (error) {

      console.log(
        error
      );

      res.status(500).send({
        success: false,
        message:
          "Delete Error"
      });
    }
  };