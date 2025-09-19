const mongoose = require('mongoose')

const uri =
  "mongodb+srv://geek-hadeed_user:Hadeed%40H123@practice.plhsltu.mongodb.net/e-commerce";



async function connectDB() {
    await mongoose.connect(uri)
}


module.exports = {
    connectDB
}