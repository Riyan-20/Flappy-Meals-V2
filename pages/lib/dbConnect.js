import { MongoClient } from "mongodb";

const uri = "mongodb+srv://admin:flappy123@flappymeals.xkolew3.mongodb.net/sample_mflix?retryWrites=true&w=majority"; // Ensure you have this in your .env.local file
let client;
let clientPromise; // Use this to persist the connection promise across requests

if (!global._mongoClientPromise) {
  // Create a new MongoDB client and set the promise globally
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}else{
    console.log("DB already Connected");
}

// Export the connection promise
export async function connectDB() {
  if (!clientPromise) {
    clientPromise = global._mongoClientPromise;
  }
  const client = await clientPromise;
  return client;
}


// let isConnected = false; // Track the connection status
// let client; // MongoDB Client instance

// export async function connectDB() {
//   if (isConnected) {
//     console.log("DB is already connected.");
//     return client;
//   }

//   try {
//     client = new MongoClient(uri);
//     await client.connect(); // Establish a connection
//     isConnected = true; // Set the connection status
//     console.log("DB is connected successfully.");
//     return client;
//   } catch (err) {
//     console.error("Error connecting to DB:", err);
//     throw new Error("DB connection failed");
//   }
// }
