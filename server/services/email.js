"use strict";
const nodemailer = require("nodemailer");
require('dotenv').config();

module.exports = {
    async sendEmail(data) {

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        var mailOptions = {
            from: process.env.EMAIL, // sender address
            to: data.email, // list of receivers
            subject: "Todo App Verification", // Subject line
            text: "Thank you for registering with us. Please use the verification code below to verify.", // plain text body
            html: `<b>Your Verificatio Code is: ${data.code}</b>`, // html body
        }

        console.log(process.env.EMAIL)
        console.log(process.env.PASSWORD)

        // send mail with defined transport object
        await transporter.sendMail(mailOptions, function(error, info) {
            if(error) {
                console.log(error)
            }
            else {
                console.log("Email Sent on ..." + data.email + " Code " + data.code)
            }
        });

        
    }
}