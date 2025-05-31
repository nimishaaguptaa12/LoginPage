// routes/user.js

const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Setup multer for handling profilePicture upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

// Temporary in-memory storage for users
let users = [];

// POST /user - Create a new user with file upload
router.post('/user', upload.single('profilePicture'), (req, res) => {
  try {
    const { name, email, age, rating } = req.body;
    const profilePicture = req.file ? req.file.filename : null;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const newUser = { name, email, age, rating, profilePicture };
    users.push(newUser);

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

// GET /users - Get all users
router.get('/users', (req, res) => {
  try {
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

module.exports = router;
