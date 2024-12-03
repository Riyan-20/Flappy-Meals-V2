// pages/api/orders.js
import { MongoClient } from "mongodb";
import { connectDB } from "../lib/dbConnect";

// const clientPromise = MongoClient.connect(
//   "mongodb+srv://admin:flappy123@flappymeals.xkolew3.mongodb.net/sample_mflix?retryWrites=true&w=majority"
// );

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // const client = await clientPromise;
      const client = await connectDB();
      const database = client.db("flappyMeals");
      const collection = database.collection("orders");

      const { orderStatus } = req.query;

      if (!orderStatus) {
        return res.status(400).json({ error: "Missing orderStatus query parameter" });
      }

      // Fetch orders matching the criteria
      const orders = await collection.find({ orderStatus }).toArray();

      // Return the list of orders
      res.status(200).json({
        message: "Orders retrieved successfully",
        orders: orders,
      });
    } catch (error) {
      // Handle errors
      console.error("Error retrieving orders:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
