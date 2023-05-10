const express = require("express");
const router = express.Router();

router.get('/sendmail', function(req,res,next){

    "use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "pspriyanka24997@gmail.com", // generated ethereal user
      pass: "lwdwcjggspnrchqx", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"GBH MART 👻" <pspriyanka24997@gmail.com>', // sender address
    to: "priyanka.sen24997@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    html: "<b>Thank You</b>", // html body
  });
    if(info.messageId){
        res.send("Email Successfully Sent")
    }else{
        res.send("Error while sending Email")
    }
  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);

   
})


module.exports = router;