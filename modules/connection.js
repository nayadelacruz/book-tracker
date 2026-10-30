// db/connection.js
import { MongoClient } from "mongodb";
import "dotenv/config";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;
// what this functions does is to help reuse the
// connection, not connect everytime it is called
export async function connectToMongoDB() {
  if (db) {
    return db;
  }

  await client.connect();

  db = client.db("bookTracker");

  console.log("Connected to MongoDB Atlas");

  return db;
}

export default client;
