import crypto from "crypto";
import nodemailer from "nodemailer"

import { myQueue } from "./producer.js";

export async function pushEmailToQueue(email){


    await myQueue.add("user:email", {
  email: email
});
}


export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


