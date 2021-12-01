const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const { checkUser } = require("./middleware/authMiddleware");

// Create express app
const app = express();

// Configure environment variables
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// Middleware
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(checkUser);

// Use routes
app.use("/api/v1", require("./routes/home"));
app.use("/api/v1", require("./routes/auth"));

app.listen(4000, () =>
  console.log(`Server started on port: ${process.env.PORT}`)
);
