
const asyncHandler = require("express-async-handler") // to avoid try catch blocks
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
//@desc Register a user
//@route GET /api/users/register
//@access public
const registerUser = asyncHandler( async (req, res) => {
  const {username, email, password} = req.body ;
  if(!username || !email || !password){
    res.status(400);
    throw new Error("All field are required!")
  }
  const userAvailable = await User.findOne({email})
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
//@desc Login user
//@route POST/api/users/login
//@access public
const loginUser = asyncHandler( async (req, res) => {
    res.json({ message: "Login user" });
});
//@desc current user info
//@route POST/api/users/current
//@access //!private
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "Current User information" });
});


module.exports = { registerUser, loginUser, currentUser };
