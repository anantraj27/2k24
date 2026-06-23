import crypto from "crypto";
import nodemailer from "nodemailer"
import { transporter } from './index.js';

import { myQueue } from "./producer.js";

export function  pushEmailToQueue(email){


    await myQueue.add("user:email", {
  email: email
});
}





