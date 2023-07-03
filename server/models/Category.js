const mongoose = require('mongoose')
const {Schema} = mongoose

const CategorySchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },  
   slug:{
    type:String,
    lowercase:true
   }
})

const Category  = mongoose.model("category",CategorySchema) 

module.exports = Category;