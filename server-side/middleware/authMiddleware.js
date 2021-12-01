const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Protect end points with authenticated middleware
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/api/v1/login");
      } else {
        // console.log(decodedToken);
        next();
      }
    });
  } else {
    res.json({ message: "Unauthorized" });
  }
};

// Get user credentials
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    console.log("No token found");
    next();
  }
};
module.exports = { checkUser, requireAuth };
