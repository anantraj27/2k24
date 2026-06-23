import { Worker } from 'bullmq';
import nodemailer from "nodemailer"

import crypto from "crypto";
import { bullConnection } from './producer.js';
import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_KEY);
console.log("worker hii ")
console.log("SMTP_USER =", process.env.SMTP_USER);
console.log("SMTP_FROM =", process.env.SMTP_FROM);
console.log("APP_URL =", process.env.APP_URL);
 const worker = new Worker(
  'email_send',
  async job => {
     console.log("job data aayega aab ")
    console.log(job.data)
    console.log(job.data.email)
    console.log(job.data.token)
    console.log("----------------------")
    const verificationUrl = `${process.env.APP_URL}/auth/verify-email?token=${job.data.token}`
     console.log("verification url-->",verificationUrl)
    try {
            console.log("BEFORE EMAIL SEND ...")
           await resend.emails.send({
            from: 'onboarding@resend.dev', // sender address
            to: job.data.email, // list of recipients
            subject: "Verify your email address..✨ ", // subject line
            // plain text body
            html: `
            <h2>Verify your email</h2>
            <p>Click the link below to verify your email address. This link expires in 24 hours.</p>
            <a href="${verificationUrl}" style="...">Verify Email</a>
            <p>If you didn't create an account, you can safely ignore this email.</p>
            `
        , // HTML body
        });
        
  }
  catch (err) {
         console.error("Error while sending mail:", err);
   }
},
  { connection: bullConnection }
);
worker.on("failed", (job, err) => {
   console.error("JOB FAILED:", err);
});

worker.on("error", (err) => {
   console.error("WORKER ERROR:", err);
});
worker.on("ready", () => {
  console.log("WORKER IS READY AND LISTENING!");
});