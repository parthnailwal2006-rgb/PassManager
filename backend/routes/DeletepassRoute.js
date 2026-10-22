const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/TokenMiddleware");
const deletePassword = require('../Controllers/DeletePassword');

router.delete('/:id', authMiddleware, deletePassword);

module.exports = router;
