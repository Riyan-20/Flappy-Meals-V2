import { MongoClient, ObjectId } from "mongodb";

// MongoDB connection string and database name
const uri = "mongodb+srv://admin:flappy123@flappymeals.xkolew3.mongodb.net/sample_mflix?retryWrites=true&w=majority";
const dbName = "flappyMeals";

export default async function handler(req, res) {
  const { productId } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Reuse the existing MongoDB client
    const client = await MongoClient.connect(uri);
    const database = client.db(dbName);
    const collection = database.collection("items");

    // Ensure the `productId` is valid for ObjectId
    if (!ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    // Find the specific product by ID
    const product = await collection.findOne({ _id: new ObjectId(productId) });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Return the product details
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
