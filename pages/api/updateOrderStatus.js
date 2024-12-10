import { MongoClient, ObjectId } from "mongodb";
import { connectDB } from "../lib/dbConnect";


export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const client = await connectDB();

      const database = client.db("flappyMeals");
      const collection = database.collection("orders");

      const { orderId, orderStatus } = req.body;

      if (!orderId || !orderStatus) {
        return res.status(400).json({ error: "Order ID and order status are required." });
      }

      const result = await collection.updateOne(
        { _id: new ObjectId(orderId) },
        { $set: { orderStatus: orderStatus } }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "Order not found." });
      }

      res.status(200).json({ message: "Order status updated successfully." });
    } catch (error) {
      console.error("Error updating order status:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
