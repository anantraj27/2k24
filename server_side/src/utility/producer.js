import { bullConnection } from "./consumer.js";
import { Queue } from "bullmq";

export const myQueue = new Queue(
  "email_send",
  {
    connection: bullConnection
  }
);