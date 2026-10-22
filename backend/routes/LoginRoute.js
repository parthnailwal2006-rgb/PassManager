const express= require('express')
const router= express.Router();
const {registerSchema}=require('../validators/authValidor');
const authenticateUser= require('../Controllers/LoginController')
const validate=require('../middleware/registerMiddleware')
router.post('/', validate(registerSchema),authenticateUser);

module.exports=router;