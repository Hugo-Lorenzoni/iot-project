import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import Github from "next-auth/providers/github";

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: <Adapter>PrismaAdapter(prisma),
  providers: [
    Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        console.log(profile);

        const { name, email, avatar_url } = profile;
        const image = avatar_url;
        return {
          isAdmin: false,
          name,
          email,
          image,
        };
      },
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.isAdmin = user.isAdmin;
      return session;
    },
  },
});
