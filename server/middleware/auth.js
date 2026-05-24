import jwt from "jsonwebtoken";

export async function authUser(req, res, next) {

  try {

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Invalid token"
      });
    }

    // verify token
    const decode = jwt.verify(
      token,
      process.env.SECRET_KEY
    );

    console.log(decode);

    // save decoded user
    req.user = decode;

    next();

  } catch (err) {

    console.log(err);

    return res.status(500).send({
      success: false,
      message: "Error"
    });
  }
}
export async function adminUser(req, res, next) {

  try {

    if (req.user && req.user.role === "admin") {
      next();
    } else {

      return res.status(403).send({
        success: false,
        message: "Access denied. Admin only"
      });
    }

  } catch (error) {

    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Server Error"
    });
  }
}