const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// new
const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// POST /user - Create new user with profile picture
router.post('/user', upload.single('profilePicture'), async (req, res) => {
  try {
    const { name, email, category, rating } = req.body;
    
    // Validate required fields
    if (!name || !email || !category || !rating) {
      return res.status(400).json({ 
        message: 'All fields are required',
        fields: { name, email, category, rating }
      });
    }

    // Create new user document
    const newUser = new User({
      name,
      email,
      category,
      rating: Number(rating),
      profilePicture: req.file?.filename
    });

    // Save to MongoDB
    const savedUser = await newUser.save();
    
    res.status(201).json({ 
      message: 'User created successfully',
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        category: savedUser.category,
        rating: savedUser.rating,
        profilePicture: savedUser.profilePicture
      }
    });

  } catch (error) {
    console.error('Error in POST /user:', error);
    
    // Handle duplicate email error
    if (error.code === 11000 && error.keyPattern.email) {
      return res.status(400).json({ 
        message: 'Email already exists',
        error: 'DUPLICATE_EMAIL'
      });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation failed',
        error: error.message
      });
    }

    res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    });
  }
});

// GET /users - Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-__v -createdAt -updatedAt');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error in GET /users:', error);
    res.status(500).json({ 
      message: 'Error fetching users',
      error: error.message 
    });
  }
});

module.exports = router;