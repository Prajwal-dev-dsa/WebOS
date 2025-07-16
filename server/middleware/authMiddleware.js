const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Middleware to protect routes
const protectedRoute = async (req, res, next) => {
  let token;
  if (
    // Check if the request has an authorization header and it starts with "Bearer"
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by the decoded token and select the password field
      req.user = await User.findById(decoded.userId).select("-password");

      // If the user is found, continue to the next middleware
      next();
    } catch (error) {
      res
        .status(401)
        .json({ success: false, message: "Not authorized, token failed" });
    }
  } else {
    res
      .status(401)
      .json({ success: false, message: "Not authorized, no token" });
  }
};

module.exports = protectedRoute;
