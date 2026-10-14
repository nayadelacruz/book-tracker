import express from "express";
import dotenv from "dotenv";
import { connectToMongoDB } from "./db/connection.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Book Tracker API is running!");
});

async function startServer() {
  try {
    await connectToMongoDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
