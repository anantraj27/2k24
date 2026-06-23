import { Worker } from 'bullmq';
import nodemailer from "nodemailer"
import { transporter } from './index.js';
import IORedis from "ioredis";

export const bullConnection = new IORedis(
  process.env.REDIS_URL,
  {
    maxRetriesPerRequest: null
  }
);

export const token = crypto.randomBytes(32).toString('hex');
export const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)


const verificationUrl = `${process.env.APP_URL}/auth/verify-email?token=${token}`
console.log("worker hii ")
 const worker = new Worker(
  'email_send',
  async job => {
    console.log(job.data)
    
    try {
            const info = await transporter.sendMail({
            from: '"happy578727@gmail.com"', // sender address
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

            console.log("Message sent: %s", info.messageId);

            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
  catch (err) {
         console.error("Error while sending mail:", err);
   }
},
  { connection: bullConnection }
);