const mongoose = require("mongoose");

//env config
require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;

const connectToDb=async()=>{
    try {
       await mongoose.connect(MONGO_URL)
        console.log("Mongo Connected")
    } catch (error) {
        console.log(error)
    }
  
}

module.exports =connectToDb;