const Users=require('../MODELS/Users')
const bcrypt=require('bcrypt')
const crypto=require('crypto')
const { deriveUserVaultKey, wrapVaultKey } = require('../services/crypto');
const CreateUsers= async(req,res)=>{
    try {
         const{name,mail,pass,}= await req.body;
        const found=await Users.findOne({mail})
        if(found){
            res.status(409).json({success:false, message:"user already exist"})
        }
        else{
             const passhash = await bcrypt.hash(pass, 12)
        const vaultSalt = crypto.randomBytes(16).toString('hex')
        const userVaultKey = deriveUserVaultKey(pass, vaultSalt);
        const wrappedVaultKey = wrapVaultKey(userVaultKey);
      
        const newuser=new Users({name,mail,passhash,vaultSalt,wrappedVaultKey})

        await newuser.save();
        return res.status(201).json({success: true, user: newuser})
        }
       
        }
        
     catch (error) {
        return res.status(500).json({message:error.message})
    }   
}
module.exports=CreateUsers;