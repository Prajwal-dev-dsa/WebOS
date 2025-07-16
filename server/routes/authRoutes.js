const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const protectedRoute = require("../middleware/authMiddleware");

//public routes
router.post("/register", registerUser); //register user
router.post("/login", loginUser); //login user

//protected routes
router.get("/me", protectedRoute, (req, res) => {
  res.status(200).json({
    message: "Token is valid.",
    user: req.user,
  });
});

module.exports = router;
