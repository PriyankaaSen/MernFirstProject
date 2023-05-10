const router = require("express").Router();
// const {createOrder,paymentCallback} = require('../controller/paymentController')
const Razorpay = require("razorpay");
var uniqid = require('uniqid'); 
const crypto = require("crypto");

router.post('/createorder', async (req,res)=>{
    try {
        const instance = new Razorpay({ key_id: process.env.KEY_ID, key_secret: process.env.SECRET_KEY })

        const options = {
            amount: req.body.amount*100, // amount in smallest currency unit
            currency: "INR",
            receipt: uniqid(),
        };
        instance.orders.create(options,(error,order)=>{
            if(error){
                console.log(error);
                return res.status(500).json({message:"something went wrong"})
            }
            res.status(200).json({data:order})
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"internal error"})
    }
})

// payment verify api

router.post("/verify", async(req,res)=>{
    try {
        const{razorpay_order_id, razorpay_payment_id,razorpay_signature} = req.body;
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
		// const expectedSign = crypto
		// 	.createHmac("sha256", process.env.KEY_SECRET)
		// 	.update(sign.toString())
		// 	.digest("hex");

            if (sign) {
                return res.status(200).json({ message: "Payment verified successfully" });
                if (res.status == 200) {
                    // dispatch(sendemail())
                    console.log('hlo nitiiiiiiinwwww')
                    // return async () => {
                    //   	  try {
                    //   		const mail = await axios.get(`http://localhost:3000/sendmail`);
                    //               console.log('email after', mail)
                    //   	  } catch (error) {
                    //   		console.log(error);
                    //   	  }
                    //   	};
                  } else {
                    
                  }
            } else {
                return res.status(400).json({ message: "Invalid signature sent!" });
            }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"internal error"})
    }
})
// router.post('/payment/callback', paymentCallback)
module.exports = router;
