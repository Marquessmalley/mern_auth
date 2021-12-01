const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Error Handler
const handleErrors = (err) => {
  let errors = { name: "", email: "", password: "" };

  // Incorrect email
  if (err.message === "Incorrect email") {
    errors.email = "Email is incorrect";
  }
  // Incorrect password
  if (err.message === "Incorrect password") {
    errors.password = "Password is incorrect";
  }

  // Handle Duplicate Emails
  if (err.code === 11000) {
    errors.email = "This email is already taken";
  }

  // Handle Validation Errors
  if (err.message.includes("User validation failed:")) {
    Object.values(err.errors).forEach(({ properties, message }) => {
      errors[properties.path] = message;
    });
  }
  return errors;
};

// Create JWT
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

// Create User Route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const token = createToken(user.id);

    res.cookie("jwt", token, { httpOnly: true }).status(200).json({
      success: true,
      token,
      user,
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.json(errors);
  }
});

// Log User In Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    const token = createToken(user.id);
    res.status(200).cookie("jwt", token, { httpOnly: true }).json({
      success: true,
      token,
      user,
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.json(errors);
  }
});

// Log User Out Route
router.get("/logout", (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) }).send();
});

// Check if user is logged in Route
router.get("/loggedin", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.json(false);

    jwt.verify(token, process.env.JWT_SECRET);
    res.send(true);
  } catch (err) {
    res.json(false);
  }
});

module.exports = router;
