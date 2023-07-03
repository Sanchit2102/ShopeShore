const mongoose = require("mongoose");
const {Schema} = mongoose;

const ProductSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  slug:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"category",
    required:true
  },
  
  quantity:{
    type:Number,
    required:true
  },
  photo:{
   data:Buffer,
  contentType:String,
  },
  shipping:{
    type:Boolean,
  },
},{timestamps:true})

const Product = mongoose.model("product",ProductSchema) 
module.exports = Product;