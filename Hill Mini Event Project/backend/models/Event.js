//Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: String,
  availableSeats: Number,
});

module.exports = mongoose.model('Event', eventSchema);