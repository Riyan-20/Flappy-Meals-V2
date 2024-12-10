import { MongoClient } from "mongodb";

const uri = "mongodb+srv://admin:flappy123@flappymeals.xkolew3.mongodb.net/sample_mflix?retryWrites=true&w=majority"; 
let client;
let clientPromise; 

if (!global._mongoClientPromise) {

  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}else{
    console.log("DB already Connected");
}

export async function connectDB() {
  if (!clientPromise) {
    clientPromise = global._mongoClientPromise;
  }
  const client = await clientPromise;
  return client;
}

