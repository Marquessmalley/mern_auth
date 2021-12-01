const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://admin:Jamesballen1@cluster0.x27a4.mongodb.net/user-auth?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(
      `Database successfully connected to DB: ${conn.connection.name}`
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
