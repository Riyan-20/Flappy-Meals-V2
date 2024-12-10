import { connectDB } from "../lib/dbConnect";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
  
      const client = await connectDB();
      const database = client.db("flappyMeals");
      const collection = database.collection("orders");

      const { customerId } = req.body; 

      if (!customerId) {
        return res.status(400).json({ error: "Missing customerId" });
      }

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
