const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [isEmail, "Enter valid email."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Your password must be longer than 6 chars"],
  },
  role: {
    type: String,
    default: "user",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Before saving user
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Check user credentials when user logs in
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const checkPwd = await bcrypt.compare(password, user.password);
    if (checkPwd) {
      return user;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect email");
};

module.exports = mongoose.model("User", userSchema);
