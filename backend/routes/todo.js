const express = require('express');
const ToDo = require('../models/ToDo');
const fetchUser = require('../middleware/fetchUser'); // Import the middleware
const router = express.Router();

// GET all todos for the authenticated user
router.get('/', fetchUser, async (req, res) => {
  try {
    const todos = await ToDo.find({ user: req.user.id }); // Filter todos by user
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new todo for the authenticated user
router.post('/', fetchUser, async (req, res) => {
  const todo = new ToDo({
    task: req.body.task,
    user: req.user.id // Associate the todo with the logged-in user
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH toggle todo complete for the authenticated user
router.patch('/:id/toggle', fetchUser, async (req, res) => {
  try {
    const todo = await ToDo.findOne({ _id: req.params.id, user: req.user.id }); // Find todo by id and user
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    todo.completed = !todo.completed;
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE a todo for the authenticated user
router.delete('/:id', fetchUser, async (req, res) => {
  try {
    const todo = await ToDo.findById(req.params.id); // Find todo by id and user
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    await ToDo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted Todo' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
