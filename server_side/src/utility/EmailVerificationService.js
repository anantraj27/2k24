
import nodemailer from "nodemailer"


export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  family: 4,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


console.log("passs aatya hai",process.env.SMTP_PASS)
