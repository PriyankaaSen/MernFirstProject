const express = require("express");
const router = express.Router();
const {createcoupon, getAllCoupon, updateCoupon, deleteCoupon} = require('../controller/couponctrl')
const {requireSignin, adminMiddleware} = require('../common-middleware')


router.post('/create-coupon',requireSignin, adminMiddleware, createcoupon);
router.get('/getCoupon',requireSignin, adminMiddleware, getAllCoupon);
router.put('/updateCoupon/:id',requireSignin, adminMiddleware, updateCoupon);
router.delete('/deleteCoupon/:id',requireSignin, adminMiddleware, deleteCoupon);







module.exports = router;
