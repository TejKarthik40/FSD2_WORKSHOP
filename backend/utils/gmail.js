const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});
const nodemailer = require('nodemailer')

let mail = async (email,username) =>{

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  let message={
    from: '23501a4440@pvpsit.ac.in', // sender address
    to: email, // list of recipients
    subject: "Account Creation", // subject line
    text: `Hi ${username},\n\nYour account has been created successfully!`, // plain text body
    html: `<p>Hi ${username},</p><p>Your account has been created successfully!</p>`, // HTML body
  }

  await transporter.sendMail(message)
  console.log("Mail sent successfully")
}

module.exports = mail