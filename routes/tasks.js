const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController'); // Import the controller functions

// Create a new task
router.post('/', tasksController.createTask);

module.exports = router;