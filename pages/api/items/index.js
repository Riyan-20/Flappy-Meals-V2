import { MongoClient } from "mongodb";
import { connectDB } from "@/pages/lib/dbConnect";
// // MongoDB client setup
// const clientPromise = MongoClient.connect(
//   "mongodb+srv://admin:flappy123@flappymeals.xkolew3.mongodb.net/sample_mflix?retryWrites=true&w=majority"
// );

export default async function handler(req, res) {
  if (req.method !== "GET") {
    // Handle non-GET requests
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    // console.log("Connecting to MongoDB...");
    const client = await connectDB();
    const database = client.db("flappyMeals");
    const collection = database.collection("items");

    console.log("Fetching items...");
    // Retrieve items from the collection
    const items = await collection.find({}).toArray();

    console.log("getItems() Function executed");
    // Send items as a response
    res.status(200).json(items);
  } catch (error) {
    console.error("Error retrieving items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
