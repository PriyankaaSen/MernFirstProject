const express = require("express");
const router = express.Router();
const CouponCode = require('../model/couponCodeSchema');

//create coupon code 

exports.createCouponCode = async (req, res) => {
    // res.status(200).json({file:req.files, body: req.body});

    try {
        const isCouponCodeExist = await CouponCode.find({ name: req.body.name })
        console.log('uuu', req.body);

        if (isCouponCodeExist.length !== 0) {
            return res.status(400).json({ message: "Coupon code already exist" });
        }
        const couponCode = await CouponCode.create(req.body)
        res.status(201).json({
            success: true,
            couponCode,
        });
    } catch (error) {
        res.status(400).json({ error : "Params required" });
    }
}

// gell all coupons

exports.getAllCouponCode = async (req, res) => {
    try {
        CouponCode.find({}).then((result)=>{
            if (result) {
                return res.status(200).json({
                    success: true,
                    result,
                });
            }
        })
    } catch (error) {
        res.status(400).json({ error : "Params required" });
    }
}