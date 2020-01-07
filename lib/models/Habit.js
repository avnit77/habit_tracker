
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  notes: String
});

module.exports = mongoose.model('Habit', schema);
