const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true
  }
});

module.exports = mongoose.model('ToDo', ToDoSchema);
