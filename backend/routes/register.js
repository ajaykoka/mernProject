const express = require('express');
const router = express.Router();
const User = require('../models/User');

const app = express();
const port = 5000;

router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
    
    // Create a new user
    const user = new User({
      name,
      email,
      password,
    });
  
    try {
      // Save the user to the database
      await user.save();
      res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to register user' });
    }
  });
module.exports = router;
