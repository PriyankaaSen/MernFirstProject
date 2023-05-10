const nodemailer = require("nodemailer")
const dotenv = require("dotenv");
dotenv.config({path:'./config.env'})


const sendUseremail = async(subject,message,send_to,sent_from,reply_to)=> {
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    // host: "smtp.gmail.com",
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
    //   user: "pspriyanka24997@gmail.com", // generated ethereal user
    //   pass: "lwdwcjggspnrchqx", // generated ethereal password
        user:process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
},
  });

  const options = {
    from: sent_from,
    to: send_to,
    replyTo: reply_to,
    subject: subject,
    html: message
  }

  //send email 
  transporter.sendMail(options, function(err,info) {
    if(err){
        console.log(err)
    } else {
        console.log(info)
    }
  })

  
}

module.exports = sendUseremail;