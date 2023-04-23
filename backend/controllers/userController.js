
const asyncHandler = require("express-async-handler") // to avoid try catch blocks
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

//! Register a user
//@route Post /api/users/register
//@access public
const registerUser = asyncHandler( async (req, res) => {
  const {username, email, password} = req.body ;
  if(!username || !email || !password){
    res.status(400);
    throw new Error("All field are required!")
  }
  //check if the email already used by another user
  const userAvailable = await User.findOne({ email })
  if(userAvailable){
    res.status(400);
    throw new Error("Email already registered!")
  }
  //Hash the Password
  const hashedPassword = await bcrypt.hash(password, 10)
  //create user
  const user = await User.create({username, email, password: hashedPassword})
  console.log(`user created : ${user}`)

  if(user){
    res.status(201).json({_id: user.id, email: user.email})
  }else {
    res.status(400)
    throw new Error("User Data is not valid")
  }
    res.json({ message: "Register the user" });
});


//! Login user
//@route POST/api/users/login
//@access public
const loginUser = asyncHandler( async (req, res) => {
  const {email, password} = req.body;
  if(!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!")
  }
  const user = await User.findOne({email})
  //compare password with hashedPassword
   if(user && (await bcrypt.compare(password, user.password ))){
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET, {expiredIn: "1m"}
    );
    res.status(200).json({accessToken })
   }else{
    res.status(401)
    throw new Error("Email or Password is not valid")
   }
});


//! current user info
//@route POST/api/users/current
//@access //!private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});


module.exports = { registerUser, loginUser, currentUser };
