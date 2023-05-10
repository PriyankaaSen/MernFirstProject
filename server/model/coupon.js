const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

couponSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true, "Please enter your coupon code name!"],
    unique:true,
    uppercase:true,
  },
  expiry:{
    type: Date,
    required: true,
  },
  discount:{
    type:Number,
    required: true,
  },
 createdAt:{
    type:Date,
    default: Date.now(),
 },
})

// collection creation
const Coupon = mongoose.model('COUPON',couponSchema);

module.exports = Coupon;
