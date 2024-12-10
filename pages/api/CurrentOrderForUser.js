import { connectDB } from "../lib/dbConnect";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
  
      const client = await connectDB();
      const database = client.db("flappyMeals");
      const collection = database.collection("orders");
      const { customerId } = req.body;

  
      const orders = await collection.find({
        customerId: customerId,
        orderStatus: { $in: ["Pending", "InProgress", "PickedUp", "PendingApproval"] }
      }).toArray();

      res.status(200).json(orders);
    } catch (error) {
      console.error("Error retrieving orders:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}