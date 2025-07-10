require("dotenv").config()
const User = require("../Model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Signup Route
exports.signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill the details",
      });
    }
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exist" });
    }
    //password hashing
    const hashPassword =await bcrypt.hash(password, 10);
    //user created successfully
    let newUser = await User.create({ email, password: hashPassword });
    //payload generate
    let token = jwt.sign({email,id:newUser._id},process.env.SECRET_KEY)
    return res.status(200).json({
      success: true,
      message: "User created Successfully",
      user: newUser,
      token:token
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during signup",
    });
  }
};

//login route
exports.login = async (req, res) => {
    //fetch data
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill the details",
      });
    }
    //checking user
    let user = await User.findOne({ email });
    if(user && bcrypt.compare(password,user.password)){
        let token = jwt.sign({email,id:user._id},process.env.SECRET_KEY)
        return res.status(200).json({
        success: true,
        message: "User login successful",
        token,user})
       
    } else{
         return res.status(400).json({
            success:false,
            message:"User not exist"
        })
    }
};
exports.getUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    return res.status(200).json({
        success:true,
        message:"User detail fetch successfully",
        email:user.email
    })
};
