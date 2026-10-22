const bcrypt=require('bcrypt')
const Users=require('../MODELS/Users')
const jwt = require('jsonwebtoken');
const dotenv=require('dotenv')
dotenv.config();
const authenticateUser=async(req,res)=>{
    try{
        const {mail,pass}=req.body;
        const user=await Users.findOne({mail})
        if(!user){
            return res.status(401).json({success:false, message: "invalid email or password"})
        }
       
        const isMatch=await bcrypt.compare(pass,user.passhash)
        if(!isMatch){
            return res.status(401).json({success:false, message: "invalid email or password"});
        }
        const token=jwt.sign({userId:user._id},process.env. JWT_SECRET,{expiresIn: '1h', algorithm: 'HS256'});
         return res.status(200).json({
            success: true,
            message: 'Login successful',
            localvault_token: token,
            localvault_count:user.count
        });

    }
    catch(error){
        return res.status(500).json({success:false, message:"internal server error"})
    }
}
module.exports=authenticateUser;