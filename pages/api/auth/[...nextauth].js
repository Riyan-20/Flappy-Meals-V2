import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/pages/lib/dbConnect";


export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username" },
        password: { label: "Password" },
        isSignup: { label: "Signup Flag"}, 
      },
      async authorize(credentials) {
        const { username, password, isSignup } = credentials;

        try {
          const client = await connectDB();
          const db = client.db("flappyMeals");
          const collection = db.collection("customer");
          console.log("WE ARE HERE")
          if (isSignup === "true") {
          
            console.log("Signup called with:", username, password);

            
            const existingCustomer = await collection.findOne({ username });
            if (existingCustomer) {
              console.log("Username already exists");
              throw new Error("Username already exists");
            }

            
            await collection.insertOne({
              username,
              password,
            });

            return { id: username, name: username };
          } else {
          
            console.log("Login called with:", username, password);
            const user = await collection.findOne({ username });
            if (user) {
              let isPasswordValid = false;
              if (password === user.password) {
                isPasswordValid = true;
              }
              if (isPasswordValid) {
                if(username === 'admin'){
                  return { id: user._id.toString(), name: user.username , role : 'admin' };
                }else{
                  return { id: user._id.toString(), name: user.username, role : 'user' };
                }
               
              } else {
                console.log("Invalid password");
                throw new Error("Invalid password"); 
              }
            } else {
              console.log("User not found");
              throw new Error("User not found"); 
            }
          }
        } catch (error) {
          console.error("Error during authentication:", error);
          throw new Error(error.message); 
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", 
  },
  callbacks: {
 
    async jwt({ token, user }) {
      console.log("TOKENBEFORE",token)
      if (user) {
        token.id = user.id;
        token.name = user.name;
        // token.email = user.email;
        token.role = user.role; 
      }

      console.log("TOKEN AFTER",token)
      return token;
    },
  
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
     
      session.user.role = token.role;
      console.log(session)
      return session;
    },
  }, 
  secret: "d9mZcId3miXpUVqHveIRoNneOp4KA0mE", 

});
