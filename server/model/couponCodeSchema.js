const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

couponCodeSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true, "Please enter your coupon code name!"],
    unique:true,
  },
  value:{
    type:Number,
    required:true,
  },
  minAmount:{
    type:Number,
    required:true,
  },
  maxAmount:{
    type:Number,
    required:true,
  },
  // productId:{
  //   type: String,
  //   required: true,
  //  },
  selectedProducts:{
    type: String
  },
 createdAt:{
    type:Date,
    default: Date.now(),
 },
})

// collection creation
const CouponCode = mongoose.model('COUPONCODE',couponCodeSchema);

module.exports = CouponCode;
