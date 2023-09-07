// controllers/userController.js
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    // Create a new user
    const user = new User(req.body);
    
    // Save the user to the database
    await user.save();

    // Return a success message
    res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};
