// pages/api/CurrentOrderForUser.js
import { MongoClient } from "mongodb";

const clientPromise = MongoClient.connect(
  "mongodb+srv://admin:flappy123@flappymeals.xkolew3.mongodb.net/sample_mflix?retryWrites=true&w=majority"
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Connect to the MongoDB database
      const client = await clientPromise;
      const database = client.db("flappyMeals");
      const collection = database.collection("orders");

      // Extract `customerId` from the request body
      const { customerId } = req.body;

      // Query to fetch orders for the user with specific statuses
      const orders = await collection.find({
        customerId: customerId,
        orderStatus: { $in: ["Pending", "InProgress", "PickedUp", "PendingApproval"] }
      }).toArray();

      // Log the orders for debugging purposes
      console.log(orders);

      // Send the matching orders as a response
      res.status(200).json(orders);
    } catch (error) {
      // Handle errors
      console.error("Error retrieving orders:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
