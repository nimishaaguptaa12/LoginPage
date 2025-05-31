require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/user');

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // or whatever port your React app runs on
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Increase payload limit to 10MB (adjust as needed)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api', userRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

// Set port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});