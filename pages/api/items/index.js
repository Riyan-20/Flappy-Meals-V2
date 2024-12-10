import { connectDB } from "@/pages/lib/dbConnect";

export default async function handler(req, res) {
  if (req.method !== "GET") {

    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {

    const client = await connectDB();
    const database = client.db("flappyMeals");
    const collection = database.collection("items");

    console.log("Fetching items...");

    const items = await collection.find({}).toArray();

    console.log("getItems() Function executed");
    res.status(200).json(items);
  } catch (error) {
    console.error("Error retrieving items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}