export async function adminUser(req,res,next){
  try{
    if(req.user && req.user.role==="admin"){
      next();
    }else{
      res.status(401).send({
        success:false,
        message:"access denied"
      })
    }
  }catch(error){
    res.status(500).send({
      success:false,
      message:error.message,
      error
    })
  }
}