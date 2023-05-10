const express = require("express");
const router = express.Router();
const {createCouponCode,getAllCouponCode} = require('../controller/couponCode')
const {requireSignin, adminMiddleware} = require('../common-middleware')


router.post('/create/couponcode',requireSignin, adminMiddleware, createCouponCode);
router.get('/get-coupon', getAllCouponCode);





module.exports = router;
