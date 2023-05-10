const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require("../middleware/authenticate");
const {signup, signin,getdata} = require('../controller/auth')
const {check} = require('express-validator');
const {validateSignupRequest,validateSigninRequest, isRequestValidated} = require('../validators/auth')
require("../db/connection");

const Contact = require("../model/contactSchema");

router.get("/", (req, res) => {
  res.send(`hello world from server router js`);
});

// signup
// Async-Await
router.post("/register", validateSignupRequest , isRequestValidated, signup);

// Login Route

router.post('/signin',validateSigninRequest, isRequestValidated, signin);

// router.post('/profile',requireSignin, (req, res) => {
//   res.status(200).json({user:'profile'})
// });

// about us page

router.get('/about', authenticate, (req, res) => {
    console.log(`Hello my About`);
    res.send(req.rootUser);
});

// get user data for contact page and home page
router.get('/getdata', authenticate, async (req,res)=> {
  try{
    const userData = await users.find()
    res.status(201).json(userData)

    console.log('fff', userData);
  }catch(error){
    res.status(400).json(error)
  }
  // console.log(`Hello my About`);
  // res.send(req.rootUser);
})

// contact us page

// router.post("/contact",authenticate, async (req, res) => {
//     try{
//       const {name, email, phone, message} = req.body;
//
//       if(!name || !email || !phone || !message){
//         console.log("error in form");
//           return res.json({error:"pls fill form"});
//       }
//
//       const userContact = await User.findOne({_id: req.userID});
//
//       if(userContact){
//
//         const userMessage = await userContact.addMessage(name, email, phone, message);
//
//         await userContact.save();
//         res.status(201).json({message:"user contacted successfully"});
//       }
//
//     }catch(error){
//       console.log(error);
//     }
// });
//  contact
router.post("/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(422).json({ error: "pls fill the property" });
  }
  try{
    const contact = new  Contact({ name, email, phone, message });
    await contact.save();
    res.status(201).json({ message: "message sent successfully" });
     }
  catch(err){
    console.log(err);
  }
});

// Logout page

router.get('/logout',(req, res) => {
    console.log(`Hello my logout`);
    res.clearCookie('jwtoken', {path:'/'});
    res.status(200).send("User logout");
});

  // Promises
  // router.post("/register", (req, res) => {
  //   const { name, email, phone, password, cpassword } = req.body;
  //
  //   if (!name || !email || !phone || !password || !cpassword) {
  //     return res.status(422).json({ error: "pls fill the property" });
  //   }
  //
  //   User.findOne({ email: email })
  //     .then((userExist) => {
  //       if (userExist) {
  //         return res.status(422).json({ error: "Email already exist" });
  //       }
  //       const user = new User({ name, email, phone, password, cpassword });
  //
  //       user
  //         .save()
  //         .then(() => {
  //           res.status(201).json({ message: "user registered successfully" });
  //         })
  //         .catch((err) => res.status(500).json({ erorr: "registered failed" }));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // });


module.exports = router;
