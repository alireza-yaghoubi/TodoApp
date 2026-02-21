import User from "@/models/User";
import { verifayPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";



export default NextAuth({
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;
        try {
          await connectDB();
        } catch (err) {
          throw new Error("Error in connecting to DB");
        }

        // sign up code

        if (!email || !password) {
          throw new Error("Invalid Data");
        }

        const user = await User.findOne({ email: email });

        if (!user) {
          throw new Error("User exists already");
        }
        const isValid = await verifayPassword(password, user.password);
        if (!isValid) throw new Error("UserName or Password is incorrecr!");
        return { email };
      },
    }),
    GitHubProvider({
      
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,

    }),
  ],
  callbacks: {
    async signIn({ user }) {
      await connectDB(); // اتصال به دیتابیس

      const existingUser = await User.findOne({ email: user.email });
     
      if (!existingUser) {
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
        });
      }

      return true;
    },
  },
});
