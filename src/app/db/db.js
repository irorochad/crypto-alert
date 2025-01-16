require("dotenv").config(); // Assuming you use a .env file for local development

const { neon } = require("@neondatabase/serverless");
const { drizzle } = require("drizzle-orm/neon-http");

if (!process.env.DB_CONNECTION_STRING) {
  throw new Error("Invalid DB Connection.");
}

const sql = neon(process.env.DB_CONNECTION_STRING);
const db = drizzle(sql);

module.exports = db;
