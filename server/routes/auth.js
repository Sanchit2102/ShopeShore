const express =require('express');
const { registerController, loginController, forgotPasswordController, getUsersController, updateUser, getOrders, getAllOrders, orderStatus } = require('../controllers/userController');
const { register, login } = require('../middleware/validation');
const fetchuser = require('../middleware/fetchuser');
const isAdmin = require('../middleware/admin')

//router object
const router = express.Router();

//register 
router.post("/register",register,registerController)

//login
router.post("/login",login,loginController)

//Forgot Password - POST
router.post("/forgot-password",forgotPasswordController)

//Get user -GET
router.get("/get-users",getUsersController)

 //update user 
 router.put("/update-user",fetchuser,updateUser)

//Protect routes/user
router.get("/user-auth",fetchuser,(req,res)=>{
    return res.status(200).send({ok:true})
    })
    
//Protect routes/admin
    router.get("/admin-auth",fetchuser,isAdmin,(req,res)=>{
        return res.status(200).send({ok:true})
        })
        
//orders
router.get("/orders",fetchuser,getOrders)

//orders
router.get("/all-orders",fetchuser,isAdmin,getAllOrders)

//update order status
router.put("/order-status/:orderId",fetchuser,isAdmin,orderStatus)

 

module.exports = router;