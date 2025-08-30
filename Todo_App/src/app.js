const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(express.json()); // parse JSON bodies

const uri =
  "mongodb+srv://geek-hadeed_user:Hadeed%40H123@practice.plhsltu.mongodb.net/";

const client = new MongoClient(uri);

const dbName = "Todo_App";
let collection;

// Connect to DB
async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
    const db = client.db(dbName);
    collection = db.collection("Todos");
  } catch (error) {
    console.error("❌ Error connecting to DB:", error);
  }
}
connectDB();

// ------------------- ROUTES (all using app.use) -------------------

// Home
app.use("/", (req, res) => {
  res.send("Hello World!");
});

// Get all todos
app.use("/getTodos", async (req, res) => {
  try {
    const todos = await collection.find({}).toArray();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// Add todo
app.use("/addTodo", async (req, res) => {
  try {
    const { name, age } = req.body;
    const result = await collection.insertOne({ name, age });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to add todo" });
  }
});

// Delete todo (by query param ?id=...)
app.use("/deleteTodo", async (req, res) => {
  try {
    const { id } = req.query;
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

// Update todo (by query param ?id=...)
app.use("/updateTodo", async (req, res) => {
  try {
    const { id } = req.query;
    const { name, age } = req.body;
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, age } }
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" });
  }
});

// ------------------- START SERVER -------------------
app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});
