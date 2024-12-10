import { ObjectId } from 'mongodb';
import { connectDB } from '../lib/dbConnect';


export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Only DELETE requests are allowed' });
  }

  const { id, role } = req.body;

  
  if (!id || !role) {
    return res.status(400).json({ message: 'Product ID and role are required' });
  }

  if (role !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized: Only admins can delete products' });
  }

  try {
    const client = await connectDB();

    const db = client.db('flappyMeals');
    const collection = db.collection('items');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    client.close();

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ message: 'Failed to delete product' });
  }
}