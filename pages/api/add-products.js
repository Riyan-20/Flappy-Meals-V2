import { connectDB } from '../lib/dbConnect';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const {name, description, imageUrl, price } = req.body;
  console.log(name,description,imageUrl,price);

  if (!name || !description || !imageUrl || !price) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {

    const client = await connectDB();

    const db = client.db('flappyMeals');
    const collection = db.collection('items');

    const result = await collection.insertOne({
    
      name,
      description,
      imageUrl,
      price,
    });

    client.close();

    return res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error inserting product:', error);
    return res.status(500).json({ message: 'Failed to add product' });
  }
}