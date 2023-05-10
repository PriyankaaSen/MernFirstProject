const express = require("express");
const sendUseremail = require("../controller/email");
const router = express.Router();

router.post("/emailsend", async(req, res) => {
    const {email} = req.body;

    try{
        const send_to= email;
        const sent_from= process.env.EMAIL_USER;
        const reply_to= email;
        const subject= "Thank You"
        const message=`
        <h3>hiiii User</h3>
        `
        await sendUseremail(subject,message,send_to,sent_from,reply_to)
        res.status(200).json({success:true, message:"send email"})
    }catch(error){
        res.status(500).json(error.message)
    }
})

module.exports = router;