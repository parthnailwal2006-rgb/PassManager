const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/TokenMiddleware");
const updatePassword = require('../Controllers/UpdatePassword');


router.put('/:id', authMiddleware, updatePassword);

module.exports = router;
