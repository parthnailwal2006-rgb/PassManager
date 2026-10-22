const express= require('express')
const router= express.Router();
const authMiddleware=require("../middleware/TokenMiddleware")
const createPassword=require('../Controllers/CreatePassword');

router.post('/',authMiddleware ,createPassword);

module.exports=router;