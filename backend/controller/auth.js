const User = require('../models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_secure="Naman@!15"

exports.handleNewUser=async(req,res)=>{
    let success=false;
  
    //validating the user input
     const isvalid=validationResult(req);
    
     if(!isvalid.isEmpty()){
      return res.status(400).json({success:success,msg:isvalid.array()});
     }
     
    let newUser=await User.findOne({email:req.body.email});
  
   // checking for the new user
    if(newUser){
      return res.status(400).json({success:success,msg:"Sorry, User with the given email already exists"});
    }
    
    const salt = await bcrypt.genSalt(10);
    const sec_password = await bcrypt.hash(req.body.password, salt);
  
    const details={
      name:req.body.name,
      email:req.body.email,
      password:sec_password
    }
  
    // Create a new instance of the User model
    const user = new User(details);  
  
    // Save the user to the database
    user.save()
      .then(()=> {
        const data={
          user:{
            id:user.id
          }
        }
        const token=jwt.sign(data,JWT_secure);
        success=true;
        res.json({success:success,auth:token});
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({success:success,msg:"Some error occured"});
      });
  }

exports.handleLogIn=async(req,res)=>{

    let success=false;
    const isvalid=validationResult(req);
    if(!isvalid.isEmpty()){
     return res.status(400).json({success:success,msg:isvalid.array()});
    }
  
    try{
      let user=await User.findOne({email:req.body.email});
  
      // checking for the new user
       if(!user){
         return res.status(400).json({success:success,msg:"Please try to login with the correct credentials"});
       }
  
       let password_cmp= bcrypt.compareSync(req.body.password,user.password);
       if(!password_cmp){
        return res.status(400).json({success:success,msg:"Please try to login with the correct credentials"});
       }
  
       const data={
        user:{
          id:user.id
        }
       
      }
      const token=jwt.sign(data,JWT_secure);
      success=true;
      res.json({success:success,auth:token});
  
    }catch(error){
      console.log(error)
      res.status(500).json({success:success,msg:"Some error occured"})
    } 
  }

  exports.handleFetch=async(req,res)=>{
    console.log(req.body.id);
    try{      
    const userId=req.user.id;
    const data=await User.findById(userId).select("-password");
    res.json(data);
    }catch(error){
      console.error('Error saving user:', error);
      res.status(500).send("Some error occured");
    }
  }