
import { Pool } from "pg";
import dotenv from 'dotenv';

const result = dotenv.config();
console.log(result);

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

console.log("DATABASE_URL:", process.env.DATABASE_URL);

export default db;