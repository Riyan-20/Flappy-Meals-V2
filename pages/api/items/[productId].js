import { connectDB } from "@/pages/lib/dbConnect";
import { MongoClient, ObjectId } from "mongodb";

const dbName = "flappyMeals";

export default async function handler(req, res) {
  const { productId } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    const client = await connectDB();
    const database = client.db(dbName);
    const collection = database.collection("items");


    if (!ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const product = await collection.findOne({ _id: new ObjectId(productId) });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}