const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  rating: { type: Number, required: true },
  profilePicture: String
});

module.exports = mongoose.model('User', userSchema);