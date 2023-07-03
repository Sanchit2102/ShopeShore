const mongoose = require("mongoose")
const {Schema} = mongoose;

const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:{},
        required:true
    },
    answer:{
   type:String,
   required:true
    },
    role:{
        type:Number,
        default:0
    }

},{timestamps:true})

const User  = mongoose.model("user",UserSchema) 

module.exports = User;