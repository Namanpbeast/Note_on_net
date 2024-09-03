const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const { body } = require('express-validator');
const { handleDelete, handleUpdate, fetchNotes, handlePutNote } = require('../controller/note');

//fetching notes
router.get('/fetchallnotes', fetchUser, fetchNotes);

router.post('/postnotes',fetchUser,[
  body('title',"The title field must have minimum 3 characters").isLength({min:3}),
  body('description',"The description field must have minimum 8 characters").isLength({min:8}),
],handlePutNote)

//Updating the existing notes
router.put('/update/:id', fetchUser, handleUpdate);

//Deleting the existing note
router.delete('/deletenote/:id', fetchUser, handleDelete);

module.exports = router;
