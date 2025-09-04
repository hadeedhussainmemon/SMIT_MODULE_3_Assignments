const mongoose = require("mongoose");
const uri =
  "mongodb+srv://geek-hadeed_user:Hadeed%40H123@practice.plhsltu.mongodb.net/TodoApp_Mongoose";

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error);
  }
}
module.exports = { connectDB };
