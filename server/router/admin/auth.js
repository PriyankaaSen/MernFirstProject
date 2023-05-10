const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require("../../middleware/authenticate");
const {signup, signin, signout,userdatalist,deleteUser} = require('../../controller/admin/auth')
const {validateSignupRequest,validateSigninRequest, isRequestValidated} = require('../../validators/auth')
const {requireSignin} = require("../../common-middleware");
const User = require("../../model/userSchema");

// require("../db/connection");
// const Contact = require("../model/contactSchema");

router.get("/", (req, res) => {
  res.send(`hello world from server router js`);
});

// signup
// Async-Await
router.post("/admin/register",validateSignupRequest , isRequestValidated, signup);

// Login Route

router.post('/admin/signin', validateSigninRequest , isRequestValidated, signin);

// Logout
router.post('/admin/signout', signout);


// user profile
router.post('/profile',requireSignin, (req, res) => {
  res.status(200).json({user:'profile'})
});

// get userdata
router.post('/userdetail', userdatalist);

// user delete api
router.delete('/user/delete/:id', deleteUser)

router.get('/user/userList', async (req, res)=>{
  User.find({}, (err, result)=> {
    if(err){
      res.send(err)
    }else{
      res.send(result)
    }
  })
})

router.put('/user/updateUser', async(req,res)=>{
  const newName = req.body.newName
  const newEmail = req.body.newEmail
  const id = req.body.id
console.log(newName,newEmail, id);
  try{
    await User.findById(id, (error, userToUpdate)=>{
      userToUpdate.name = String(newName);
      userToUpdate.email = String(newEmail);
      userToUpdate.save();
    })

  }catch(error){
    console.log(error);
  }
  res.send("user is updated")
})

router.delete("/user/userDelete/:id", async(req, res)=>{
  const id = req.params.id;
  await User.findByIdAndRemove(id).exec()
  res.send("user deleted")
})

// update Admin User profile
router.put('/admin/profileUpdate',requireSignin,
async(req,res)=>{
  const user = await User.findById(req.user.id);
  if(user){
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
      if(req.body.password){
        user.password = req.body.password || user.password;
      }

  const updatedAdmin = await user.save();
  res.json({
    _id:updatedAdmin._id,
    name:updatedAdmin.name,
    email:updatedAdmin.email,
    phone:updatedAdmin.phone,
    token:generateTOken(updatedAdmin._id),
  })
}
}
)
// // about us page
//
// router.get('/about', authenticate, (req, res) => {
//     console.log(`Hello my About`);
//     res.send(req.rootUser);
// });
//
// // get user data for contact page and home page
// router.get('/getdata', authenticate, (req,res)=> {
//   console.log(`Hello my About`);
//   res.send(req.rootUser);
// })
//
// // contact us page
//
// // router.post("/contact",authenticate, async (req, res) => {
// //     try{
// //       const {name, email, phone, message} = req.body;
// //
// //       if(!name || !email || !phone || !message){
// //         console.log("error in form");
// //           return res.json({error:"pls fill form"});
// //       }
// //
// //       const userContact = await User.findOne({_id: req.userID});
// //
// //       if(userContact){
// //
// //         const userMessage = await userContact.addMessage(name, email, phone, message);
// //
// //         await userContact.save();
// //         res.status(201).json({message:"user contacted successfully"});
// //       }
// //
// //     }catch(error){
// //       console.log(error);
// //     }
// // });
// //  contact
// router.post("/contact", async (req, res) => {
//   const { name, email, phone, message } = req.body;
//
//   if (!name || !email || !phone || !message) {
//     return res.status(422).json({ error: "pls fill the property" });
//   }
//   try{
//     const contact = new  Contact({ name, email, phone, message });
//     await contact.save();
//     res.status(201).json({ message: "message sent successfully" });
//      }
//   catch(err){
//     console.log(err);
//   }
// });
//
// // Logout page
//
// router.get('/logout',(req, res) => {
//     console.log(`Hello my logout`);
//     res.clearCookie('jwtoken', {path:'/'});
//     res.status(200).send("User logout");
// });
//
//   // Promises
//   // router.post("/register", (req, res) => {
//   //   const { name, email, phone, password, cpassword } = req.body;
//   //
//   //   if (!name || !email || !phone || !password || !cpassword) {
//   //     return res.status(422).json({ error: "pls fill the property" });
//   //   }
//   //
//   //   User.findOne({ email: email })
//   //     .then((userExist) => {
//   //       if (userExist) {
//   //         return res.status(422).json({ error: "Email already exist" });
//   //       }
//   //       const user = new User({ name, email, phone, password, cpassword });
//   //
//   //       user
//   //         .save()
//   //         .then(() => {
//   //           res.status(201).json({ message: "user registered successfully" });
//   //         })
//   //         .catch((err) => res.status(500).json({ erorr: "registered failed" }));
//   //     })
//   //     .catch((err) => {
//   //       console.log(err);
//   //     });
//   // });


module.exports = router;
