const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const sendEmail = async (options) => {
     const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS
      }
    })

     await transporter.sendMail({
       from: process.env.SMTP_EMAIL,
        to: options.to,
        subject: options.subject,
        html: options.html,
    });

}

module.exports = sendEmail;