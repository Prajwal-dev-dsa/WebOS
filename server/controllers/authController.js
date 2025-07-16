const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//generate token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

//register user
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    //validate fields
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    //check if user exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    //create user
    const user = await User.create({ username, password });
    if (user) {
      res.status(201).json({
        user: {
          _id: user._id,
          username: user.username,
        },
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//login user
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    //validate fields
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    //check if user exists
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    res.status(200).json({
      user: {
        _id: user._id,
        username: user.username,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { registerUser, loginUser };
