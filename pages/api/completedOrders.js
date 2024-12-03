import { MongoClient } from "mongodb";
import { connectDB } from "../lib/dbConnect";

// const clientPromise = MongoClient.connect(
//   "mongodb+srv://admin:flappy123@flappymeals.xkolew3.mongodb.net/sample_mflix?retryWrites=true&w=majority"
// );

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // const client = await clientPromise;
      const client = await connectDB();
      const database = client.db("flappyMeals");
      const collection = database.collection("orders");

      const { customerId } = req.body; // Expecting `customerId` in the request body

      if (!customerId) {
        return res.status(400).json({ error: "Missing customerId" });
      }

      // Fetch completed orders for the specific customer
      const orders = await collection.find({ customerId, orderStatus: "Completed" }).toArray();

      res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching completed orders:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
