// routes/auth.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Registration route
router.post('/register', UserController.register);

module.exports = router;