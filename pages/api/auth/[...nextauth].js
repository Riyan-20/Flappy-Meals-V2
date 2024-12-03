import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import { connectDB } from "@/pages/lib/dbConnect";

const clientPromise = MongoClient.connect(
  "mongodb+srv://admin:flappy123@flappymeals.xkolew3.mongodb.net/sample_mflix?retryWrites=true&w=majority"
);

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
        isSignup: { label: "Signup Flag", type: "hidden" }, // Adding an indicator for signup
      },
      async authorize(credentials) {
        const { username, password, isSignup } = credentials;

        try {
          const client = await connectDB();
          // const client = await clientPromise;
          const db = client.db("flappyMeals");
          const collection = db.collection("customer");

          if (isSignup === "true") {
            // Handle Signup Logic
            console.log("Signup called with:", username, password);

            // Check if username already exists
            const existingCustomer = await collection.findOne({ username });
            if (existingCustomer) {
              console.log("Username already exists");
              throw new Error("Username already exists"); // Throw specific error
            }

            // Insert new customer into the database
            await collection.insertOne({
              username,
              password,
            });

            return { id: username, name: username, email: null }; // Return user info
          } else {
            // Handle Login Logic
            console.log("Login called with:", username, password);
            const user = await collection.findOne({ username });
            if (user) {
              let isPasswordValid = false;
              if (password === user.password) {
                isPasswordValid = true;
              }
              if (isPasswordValid) {
                if(username === 'admin'){
                  return { id: user._id.toString(), name: user.username, email: user.email || null, role : 'admin' };
                }else{
                  return { id: user._id.toString(), name: user.username, email: user.email || null, role : 'user' };
                }
               
              } else {
                console.log("Invalid password");
                throw new Error("Invalid password"); // Throw specific error
              }
            } else {
              console.log("User not found");
              throw new Error("User not found"); // Throw specific error if user does not exist
            }
          }
        } catch (error) {
          console.error("Error during authentication:", error);
          throw new Error(error.message); // Return the exact error message
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT session strategy
  },
  callbacks: {
    // JWT callback to store user role in the token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role; // Store role in JWT token
      }
      return token;
    },
    // Session callback to attach user role to the session
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.role = token.role; // Attach role to session
      return session;
    },
  }, 
  secret: "d9mZcId3miXpUVqHveIRoNneOp4KA0mE", // JWT signing secret
  debug: true,
});
