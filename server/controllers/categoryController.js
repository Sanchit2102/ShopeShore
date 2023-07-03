const express = require("express");
const Category = require("../models/Category")
const slugify = require('slugify')

exports.createCategory=async(req,res)=>{
try {
    const {name} = req.body;
    if(!name){
        return res.status(401).send({
            message:"name is required"
        })
    }

   const existingCategory = await Category.findOne({name})
   if(existingCategory){
    return res.status(200).send({
        success:true,
        message:"Category already exists"
    })
   }

  const category = await Category.create({
    name,slug:slugify(name)
  })
   
  return res.status(201).send({
    success:true,
    message:"Category created",
    category
  })

} catch (error) {
    return res.status(500).send({
        success:false,
        message:"error in create category",
        error
    })
}
}

exports.updateCategory = async(req,res)=>{
    try {
        const {name} = req.body;
        const {id} = req.params;
        const category = await Category.findByIdAndUpdate(id,{name:name,slug:slugify(name)},{new:true})
        return res.status(200).send({
            success:true,
            message:"Category updated",
            category
        })
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"error in category update",
            error
        })
    }
}

//Delete Category
exports.deleteCategory =async(req,res)=>{
    try {
        await Category.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success:true,
            message:"Category deleted", 
        })
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"error in delete category"
        })
    }
}

//GET Category

//single category
exports.getCategory =async(req,res)=>{
try {
    const category = await Category.findOne({slug:req.params.slug})
    if(!category){
        return res.status(200).send({
            success:false,
            message:"No category found"
        })
    }

 return res.status(200).send({
    success:true,
    message:"Category found",
    category
 })

} catch (error) {
    return res.status(500).send({
        success:false,
        message:'Error in get category by id'
    })
}
}

//All category
exports.getAllCategory =async(req,res)=>{
    try {
        const category = await Category.find({})
        if(category === 0){
            return res.status(200).send({
                success:false,
                message:"No category found"
            })
        }

     return res.status(200).send({
        categoryCount:category.length,
        success:true,
        message:"Category found",
        category
     })
    
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:'Error in get all category'
        })
    }
}