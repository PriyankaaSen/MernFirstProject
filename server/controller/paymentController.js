const dotenv = require("dotenv");
dotenv.config({path:'./config.env'})
var uniqid = require('uniqid'); 


const Razorpay = require("razorpay");

const instance = new Razorpay({ key_id: process.env.KEY_ID, key_secret: process.env.SECRET_KEY })

exports.createOrder = (req,res)=>{
    const options = {
        amount: 50000, // amount in smallest currency unit
        currency: "INR",
        receipt: uniqid(),
    };

    instance.orders.create(options, function(err,order){
        if(err)
        {
            return res.status(500).json({error:err})
        }
        res.json(order)
    });
}

exports.paymentCallback=(req,res)=>{
    
}