const jwt=require('jsonwebtoken');

module.exports = (req,res,next)=>{
  const token=req.header("auth-token");
  if(!token){
    return res.status(401).send("Acess Denied");
  }
  try{
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = verified;
  }catch(err){
    return res.status(400).send("Invalid Token");
  }
  next();
}