require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose'); 
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

// Database connection NEW
// const mongoose = require('mongoose');

// Add these parameters
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/loginDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // 5 seconds timeout for initial connection
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
  maxPoolSize: 10 // Maximum number of connections
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit process if no connection
});

// Add event listeners for better debugging
mongoose.connection.on('connecting', () => console.log('Connecting to MongoDB...'));
mongoose.connection.on('connected', () => console.log('MongoDB connected!'));
mongoose.connection.on('error', (err) => console.error('MongoDB error:', err));
 
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