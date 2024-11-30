import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://admin:flappy123@flappymeals.xkolew3.mongodb.net/sample_mflix?retryWrites=true&w=majority";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const {name, description, imageUrl, price } = req.body;
  console.log(name,description,imageUrl,price);
  // Validate the request payload
  if (!name || !description || !imageUrl || !price) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(uri);
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
