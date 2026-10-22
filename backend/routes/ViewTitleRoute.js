const express= require('express')
const router= express.Router();
const authMiddleware=require("../middleware/TokenMiddleware")
const viewTitle=require('../Controllers/Viewtitle');

router.get('/',authMiddleware ,viewTitle);

module.exports=router;