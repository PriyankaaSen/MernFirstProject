const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

contactSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  phone:{
    type:Number,
    required:true
  },
  message:{
    type:String,
    required:true
  }
})

// collection creation
const Contact = mongoose.model('CONTACT',contactSchema);

module.exports = Contact;
