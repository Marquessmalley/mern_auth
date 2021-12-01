const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { requireAuth, checkUser } = require("../middleware/authMiddleware");

router.get("/home", requireAuth, (req, res) => {
  res.json({ message: "Welcome to the home page", user: res.locals.user });
});

module.exports = router;
