import { MongoClient, ObjectId } from 'mongodb';
import { connectDB } from '../lib/dbConnect';

// const uri = "mongodb+srv://admin:flappy123@flappymeals.xkolew3.mongodb.net/sample_mflix?retryWrites=true&w=majority";

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Only DELETE requests are allowed' });
  }

  const { id, role } = req.body;

  // Validate the request payload
  if (!id || !role) {
    return res.status(400).json({ message: 'Product ID and role are required' });
  }

  // Check if the role is admin
  if (role !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized: Only admins can delete products' });
  }

  try {
    // Connect to MongoDB
    const client = await connectDB();
    // const client = await MongoClient.connect(uri);
    const db = client.db('flappyMeals');
    const collection = db.collection('items');

    // Delete the product by ID
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    client.close();

    // Check if the product was found and deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ message: 'Failed to delete product' });
  }
}
