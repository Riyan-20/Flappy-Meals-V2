import { connectDB } from "../lib/dbConnect";


export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const client = await connectDB();
      const database = client.db("flappyMeals");
      const collection = database.collection("orders");

      const { orderStatus } = req.query;

      if (!orderStatus) {
        return res.status(400).json({ error: "Missing orderStatus query parameter" });
      }
      const orders = await collection.find({ orderStatus }).toArray();

      res.status(200).json({
        message: "Orders retrieved successfully",
        orders: orders,
      });
    } catch (error) {

      console.error("Error retrieving orders:", error);
      res.status(500).json({ error: "Internal server error" });

    }
  } else {

    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);

  }
}
