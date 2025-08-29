const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();

const uri =
  "mongodb+srv://geek-hadeed_user:Hadeed%40H123@practice.plhsltu.mongodb.net/";

const client = new MongoClient(uri);

const dbName = "Project_Practice";

async function main() {
  await client.connect();
  console.log("Connected successfully to Database !");

  const db = client.db(dbName);
  const collection = db.collection("students");

  const data = {
    name: "Hadeed",
    age: 17,
    email: "programmerhadeed@gmail.com",
  };
  const result = await collection.insertOne(data);
  return `Inserted document with _id: ${result.insertedId}`;
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
