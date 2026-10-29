import jwt from 'jsonwebtoken'
export async function authUser(req,res,next){
  try{
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
  }catch(error){
    res.status(500).send({
      success:false,
      message:"unothorized",
      error
    })
  }
}