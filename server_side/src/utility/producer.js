
import { Queue } from "bullmq";
import IORedis from "ioredis";

export const bullConnection = new IORedis(
  process.env.REDIS_URL,
  {
    maxRetriesPerRequest: null
  }
);

export const myQueue = new Queue(
  "email_send",
  {
    connection: bullConnection
  }
);
export async function pushEmailToQueue(email,token){


    await myQueue.add("user:email", {
  email,
  token

});
}