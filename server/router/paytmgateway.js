// var { addPaytmGateway } = require("../controller/paytmController")
const express = require('express');
const router = require("express").Router();
const path = require('path');
const dotenv = require("dotenv");
dotenv.config({path:'./config.env'})
const { v4: uuidv4 } = require('uuid');
var PaytmChecksum = require("../PaytmChecksum");


router.post("/paymentpaytm", (req,res)=>{


const {amount,email} = req.body;

    /* import checksum generation utility */


const paytmamount = JSON.stringify(amount)
var params = {};

/* initialize an array */
params['MID'] = process.env.PAYTM_MID,
params['WEBSITE'] = process.env.PAYTM_WEBSITE,
params['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID,
params['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID,
params['ORDER_ID'] = uuidv4(),
params['CUST_ID'] = process.env.PAYTM_CUST_ID,
params['TXN_AMOUNT'] = paytmamount,
params['CALLBACK_URL'] = 'http://localhost:3000/callback'
params['EMAIL'] = email
params['MOBILE_NO'] = '1234567852'

/**
* Generate checksum by parameters we have
* Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
*/
var paytmChecksum = PaytmChecksum.generateSignature(params, process.env.PAYTM_MERCHANT_KEY);
paytmChecksum.then(function(checksum){
	const paytmParams = {
        ...params,
        'CHECKSUMHASH': checksum
    };
    res.json(paytmParams)
}).catch(function(error){
	console.log(error);
});
});
module.exports = router;
