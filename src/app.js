// app.js
import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// MongoDB connection
const client = new MongoClient(process.env.MONGO_URI);

async function connectDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connected to MongoDB Atlas");

    // You can get a handle to your DB like this:
    // const db = client.db("blog");
    // const posts = db.collection("posts");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}
connectDB();

app.get("/", (req, res) => {
  res.send("Fightrons Blog API is running with official MongoDB driver!");
});

app.listen(port, () => {
  console.log(`🚀 API server running at http://localhost:${port}`);
});
