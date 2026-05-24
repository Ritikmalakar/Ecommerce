import jwt from "jsonwebtoken";

import jwt from "jsonwebtoken";

export async function authUser(req, res, next) {

  try {

    const token =
      req.cookies.token ||
      req.headers.authorization?.replace(
        "Bearer ",
        ""
      );

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "No token"
      });
    }

    const decode = jwt.verify(
      token,
      process.env.SECRET_KEY
    );

    req.user = decode;

    next();

  } catch (err) {

    console.log(err);

    return res.status(401).send({
      success: false,
      message: "Invalid token"
    });
  }

}

export async function adminUser(req, res, next) {

  try {

    if (
      req.user &&
      req.user.role === "admin"
    ) {
      next();
    } else {

      return res.status(403).send({
        success: false,
        message:
          "Access denied. Admin only"
      });
    }

  } catch (error) {

    console.log(error);

    return res.status(500).send({
      success: false,
      message:
        "Server Error"
    });
  }
}