// pages/api/updateOrderStatus.js
import { MongoClient, ObjectId } from "mongodb";

const clientPromise = MongoClient.connect(
  "mongodb+srv://admin:flappy123@flappymeals.xkolew3.mongodb.net/sample_mflix?retryWrites=true&w=majority"
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const client = await clientPromise;
      const database = client.db("flappyMeals");
      const collection = database.collection("orders");

      const { orderId, orderStatus } = req.body;

      // Validate the input
      if (!orderId || !orderStatus) {
        return res.status(400).json({ error: "Order ID and order status are required." });
      }

      // Update the order status in the database
      const result = await collection.updateOne(
        { _id: new ObjectId(orderId) }, // Filter by the order ID
        { $set: { orderStatus: orderStatus } } // Update the order status
      );

      // Check if the update was successful
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
