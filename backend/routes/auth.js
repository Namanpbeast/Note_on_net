const express=require('express');
const router=express.Router();
const { body} = require('express-validator');
const fetchUser = require('../middleware/fetchUser');
const { handleFetch, handleLogIn, handleNewUser } = require('../controller/auth');

//creating new user
router.post('/create',[
    body('email',"Enter a valid Email").isEmail(),
    body('password',"The password field must have minimum 8 characters").isLength({min:8}),
    body('name',"The name field must have minimum 3 characters").isLength({min:3}),
],handleNewUser)

//login in
router.post('/login',[
  body('email',"Enter a valid Email").isEmail(),
  body('password',"The password field must have minimum 8 characters").exists(), 
],handleLogIn)

//fetching logged user detail
router.post('/fetchUser',fetchUser,handleFetch)



module.exports=router