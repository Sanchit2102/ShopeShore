const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET
const Order = require("../models/Order")

//register
exports.registerController =async(req,res)=>{
    try {
        const {name,email,password,phone,address,answer} = req.body;
    
        let user = await User.findOne({email});
    
        if(user){
         return res.status(200).send({
            success:false,
            message:"User with this email already exists" 
         })
        }
    
        const secPass = await bcrypt.hash(password, 10);
    
        user = await User.create({
       name:name,
       email:email,
       password:secPass,
       phone:phone,
       address:address,
       answer:answer
        })
    
        const data = {
            user: {
              id: user.id,
            },
          };
         
          const authtoken = await jwt.sign(data,JWT_SECRET,{expiresIn:'7d'})
    
          return res.status(200).send({
            success:true,
            message:'User created Successfully',
            authtoken,
            user:{
              Id:user.id,
              name:user.name,
              email:user.email,
              phone:user.phone,
              address:user.address
            }
          })
    
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"error in register callback",
            error
        })
    }
    }

    //login
exports.loginController =async(req,res)=>{
    try {
      const{email,password} =req.body;
      let user = await User.findOne({email})
    
      if(!user){
        return res.status(200).send({
          success:false,
          message:"Please login with correct credentials"
        })
      }
    
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(200).send({
            success: false,
            message: "Please login with correct credentials",
          });
      }
    
      const data = {
        user: {
          id: user.id,
        },
      };
    
      const authtoken = await jwt.sign(data,JWT_SECRET,{expiresIn:'7d'})
    
      return res.status(200).send({
        success:true,message:"User Login Successfully",authtoken,user:{
          id:user.id,
          name:user.name,
          email:user.email,
          phone:user.phone,
          role:user.role,
          address:user.address
        }
      })
    
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        success:false,
        message:'error in login callback',
        error
      })
    }
    }
    
    //Update Users details
    
    exports.updateUser = async(req,res)=>{
    try {
      const {name,email,phone,address,password} = req.body;
    
      let user = await User.findById(req.user.id)
    
      if(password && password.length <8){
        res.json({error:"Password is required to be 8 character atleast"})
      }
     
      const secPass = password ? await bcrypt.hash(password, 10):undefined ;
    
      let updatedUser  = await User.findByIdAndUpdate(req.user.id,{
        name:name || user.name,
        password:secPass || user.password,
        phone:phone || user.phone,
        address :address || user.address
      },{new:true})
      
      return res.status(200).send({
        success:true,
        message:"User Detail Updated Successfully",
        updatedUser
      })
    
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success:false,
        message:"error in Update user",
        
      })
    }
    }
    
    //all users
    exports.getUsersController = async (req, res) => {
      try { 
        const user =await User.find({})
        return res.status(200).send({user})
    
      } catch (error) {
        console.log(error);
        return res.status(500).send({
          success: false,
          message: "error in get sll user callback",
        });
      }
    };
    
    //Forgot  Password
    exports.forgotPasswordController = async(req,res)=>{
    try {
      const {email,answer,newPassword} = req.body
    
      if(!email){
        res.status(400).send({message:"email is required"})
      }
      if(!answer){
        res.status(400).send({message:"answer is required"})
      }
      if(!newPassword){
        res.status(400).send({message:"newPassword is required"})
      }
      //check email and answer
      const user= await User.findOne({email,answer})
    
      //validation
      if(!user){
        return res.status(400).send({
          success:false,
          message:"wrong email and answer"
        })
      }
    const hashed =await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(user._id,{password:hashed})
    return res.status(200).send({
      success:true,
      message:"password reset successfully"
    })
    
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        success:false,
        message:"Something went wrong",
        error
      })
    }
    }

    
//orders
exports.getOrders =async(req,res)=>{
  try {
    const orders = await Order.find({buyer:req.user.id}).populate('products','-photo').populate('buyer','name')
  return res.status(200).send({
    success:true,
    orders
  })

  } catch (error) {
    console.log(error)
    res.status(200).send({
      success:false,
      message:"error in orders callback"
    })
  }
}

//get all orders
exports.getAllOrders=async(req,res)=>{
  try {
    const orders = await Order.find({}).populate('products','-photo').populate('buyer','name').sort({ createdAt: -1 });
  return res.status(200).send({
    success:true,
    orders
  })

  } catch (error) {
    console.log(error)
    res.status(200).send({
      success:false,
      message:"error in orders callback"
    })
  }
} 

//order status update
exports.orderStatus =async(req,res)=>{
  try {
    const {orderId} =req.params;
    const {status} =req.body

    const orders = await Order.findByIdAndUpdate(orderId,{status},{new:true})
    return res.status(200).send({
      success:true,
      orders
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"error in updating order status"
    })
  }
}