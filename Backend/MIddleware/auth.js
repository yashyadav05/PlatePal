require("dotenv").config()
const jwt = require("jsonwebtoken")

const verifyToken = async(req,res,next)=>{
  let token = req.headers["authorization"]
  console.log("Authencating jwt",token)
  if(token){
    token = token.split(" ")[1]
    jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
        if(err){
          console.log("error authenticating",err)
            return res.status(400).json({message:"unable to authenticate token",err,})
        }else{
            console.log(decoded)
            req.user = decoded
            // next()
        }
    })
    next()
  }
  else{
    return res.status(400).json({message:"unable to authenticate token"})
  }
}

module.exports = verifyToken