const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({path:'./config.env'})
const express = require("express");
const app = express();
const { v4: uuid } = require('uuid');






exports.paytmMerchantkey = process.env.PAYTM_MERCHANT_KEY;
const paytmParams = {};
paytmParams['MID'] = process.env.PAYTM_MID,
paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE,
paytmParams['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID,
paytmParams['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID,
paytmParams['ORDER_ID'] = uuid(),
paytmParams['CUST_ID'] = process.env.PAYTM_CUST_ID,
paytmParams['TXN_AMOUNT'] = '100',
paytmParams['CALLBACK_URL'] = 'http://localhost:3000/callback'
paytmParams['EMAIL'] = 'priyanka@gmail.com'
paytmParams['MOBILE_NO'] = '1234567852'