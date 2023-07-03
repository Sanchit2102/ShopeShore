const User = require("../models/User");

const isAdmin = async(req,res,next)=>{
    try {
        const user = await User.findById(req.user.id)
        if(user.role !==1){
            return res.status(401).send({
                success:false,
                message:"unauthorize access"
            })
        }
        next();
    } catch (error) {
        console.log(error)
    }
 }

 module.exports = isAdmin;