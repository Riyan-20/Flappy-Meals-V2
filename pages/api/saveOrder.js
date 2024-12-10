import { MongoClient } from "mongodb";
import { connectDB } from "../lib/dbConnect";

const clientPromise = MongoClient.connect(
  "mongodb+srv://admin:flappy123@flappymeals.xkolew3.mongodb.net/sample_mflix?retryWrites=true&w=majority"
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const client = await connectDB();

      const database = client.db("flappyMeals");
      const collection = database.collection("orders");

      const {
        customerId,
        items,
        totalPrice,
        orderStatus,
        pickupLocation,
        destinationLocation,
        specialInstructions,
        customerContact,
        orderId,
        orderDate,
        orderTime,
      } = req.body;

      if (!customerId || !items || !totalPrice || !pickupLocation || !destinationLocation || !customerContact || !orderId || !orderDate || !orderTime) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newOrder = {
        customerId,
        items: items.map(item => ({
          itemId: item.id,
          itemName: item.name,
          quantity: item.quantity,
          pricePerItem: item.price,
          totalPrice: item.price * item.quantity,
          ImageUrl: item.image,
          pickupLocation,
          destinationLocation,
          specialInstructions,
        })),
        totalPrice,
        orderStatus: orderStatus || "Pending",
        pickupLocation,
        destinationLocation,
        specialInstructions,
        customerContact,
        orderId,
        orderDate,
        orderTime,
        deliveryDate: null,
        deliveryTime: null,
      };

      const result = await collection.insertOne(newOrder);

      res.status(201).json({
        message: "Order saved successfully",
        orderId: result.insertedId,
        order: newOrder,
      });
    } catch (error) {
      console.error("Error saving order:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}