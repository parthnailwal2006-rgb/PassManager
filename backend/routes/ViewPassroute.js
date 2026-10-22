const express= require('express')
const router= express.Router();
const authMiddleware=require("../middleware/TokenMiddleware")
const viewPassword=require('../Controllers/ViewPassword');

router.get('/',authMiddleware ,viewPassword);

module.exports=router;