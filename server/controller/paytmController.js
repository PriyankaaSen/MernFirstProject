const path = require('path');
const dotenv = require("dotenv");
dotenv.config({path:'./config.env'})
const {PaytmChecksum} = require('../paytm/PaytmChecksum.js');
const { paytmParams,paytmMerchantkey} = require('../paymrnt');


exports.addPaytmGateway = async (request, response) => {
    // const paytmParams = {};
    const paytmCheckSum = await PaytmChecksum.generateSignature(paytmParams, paytmMerchantkey)
    .then(function(response){
        try {
            const params = {
                ...paytmParams,
                'CHECKSUMHASH': paytmCheckSum
            };
            response.json(params);
        } catch (error) {
            console.log(error);
        }
    });
    
}
// var paytmChecksum = PaytmChecksum.generateSignature(body, "YOUR_MERCHANT_KEY");
// paytmChecksum.then(function(result){
// 	console.log("generateSignature Returns: " + result);
// }).catch(function(error){
// 	console.log(error);
// });