const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userame: {
    type: String,
    required: [true, "Please add the user name"],
  },
  email: {
    type: String,
    required: [true, "Please add the user email"],
    unique: [true, "Email address already exists"],
  },
  password: {
    type: String,
    required: [true, "Please enter the user password"],
  },
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);