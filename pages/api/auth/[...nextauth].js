

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/Mongoose/MongoDbClient";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

export default NextAuth({
  // providers -> google-Github etc
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  pages:{
    signIn: '/login',
  },
  session:{
   strategy:'jwt',
  },
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session:  async({session,token})=>{
        if(session?.user && token?.sub){
            session.user.id = token.sub
        }
        return session;
  }
  }
})