const express = require("express");
const router = express.Router();
const Coupon = require("../model/coupon");

const createcoupon = async (req, res) => {
    try {
        const newCoupon = await Coupon.create(req.body)
        res.json(newCoupon)
    } catch (error) {
        throw new Error(error)
    }
}

const getAllCoupon = async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.json(coupons);
    } catch (error) {
        throw new Error(error);
    }
}

const updateCoupon = async (req, res) => {
    const { id } = req.params;
    try {
        const updatecoupon = await Coupon.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatecoupon);
    } catch (error) {
        throw new Error(error);
    }
}
const deleteCoupon = async (req, res) => {
    const { id } = req.params;
    try {
        const deletecoupon = await Coupon.findByIdAndDelete(id);
        res.json(deletecoupon);
    } catch (error) {
        throw new Error(error);
    }
}
module.exports = { createcoupon, getAllCoupon, updateCoupon, deleteCoupon }