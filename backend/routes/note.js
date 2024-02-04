const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchUser = require('../middleware/fetchUser');
const { body,validationResult } = require('express-validator');

//fetching notes
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    console.log("Fetch Call")
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/postnotes',fetchUser,[
  body('title',"The title field must have minimum 3 characters").isLength({min:3}),
    body('description',"The description field must have minimum 8 characters").isLength({min:8}),
],async(req,res)=>{

  //validating the notes input
   const isvalid=validationResult(req);
   if(!isvalid.isEmpty()){
    return res.status(400).json(isvalid.array());
   }
  

  const details={
    user:req.user.id,
    title:req.body.title,
    description:req.body.description
  }

  // Create a new instance of the User model
  const note = new Notes(details);  

  // Save the user to the database
  note.save()
    .then((savedData)=> {
      res.json(savedData);
    })
    .catch(error => {
      console.error('Error saving user:', error);
      res.status(500).send("Some error occured");
    });
})

//Updating the existing notes
router.put('/update/:id', fetchUser, async (req, res) => {
  const {title,description,tag}=req.body;

  const newNote={};
  if(title){newNote.title=title}
  if(description){newNote.description=description}
  if(tag){newNote.tag=tag}

  try {
      let note = await Notes.findById(req.params.id);

      if(!note){
        return res.status(401).send("Not Found");
      }

      if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");
      }
      note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
      res.json({"Update":"Updation done",note:note});
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Deleting the existing note
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
  try {
      let note = await Notes.findById(req.params.id);

      if(!note){
        return res.status(401).send("Not Found");
      }

      if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");
      }
      note=await Notes.findByIdAndDelete(req.params.id);
      res.json({"Delete":"Deletion Done"});
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
