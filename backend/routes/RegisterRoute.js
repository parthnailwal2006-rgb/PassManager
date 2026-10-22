const express= require('express')
const router= express.Router();
const {registerSchema}=require('../validators/authValidor');
const CreateUsers=require('../Controllers/RegisterController')
const validate=require('../middleware/registerMiddleware')
router.post('/', validate(registerSchema),CreateUsers);

module.exports=router;