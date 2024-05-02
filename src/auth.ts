import NextAuth, { Session, User, getServerSession } from "next-auth";
import { Adapter } from "next-auth/adapters";
// import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import Github from "next-auth/providers/github";

import { createId } from "@paralleldrive/cuid2";

const prisma = new PrismaClient();

export const AUTH_OPTIONS = {
  adapter: <Adapter>PrismaAdapter(prisma),
  providers: [
    Github({
      clientId: process.env.GITHUB_ID!!,
      clientSecret: process.env.GITHUB_SECRET!!,
      profile(profile) {
        console.log(profile);

        const { name, email, avatar_url } = profile;
        const image = avatar_url;
        return {
          id: createId(),
          isAdmin: false,
          name,
          email,
          image,
        };
      },
    }),
  ],
  callbacks: {
    session({ session, user }: { session: Session; user: User }) {
      if (session?.user) session.user.isAdmin = user.isAdmin;
      return session;
    },
  },
  secret: process.env.NEXTAUT_SECRET,
};

export default NextAuth(AUTH_OPTIONS);

export async function getNextAuthSession() {
  const session = await getServerSession(AUTH_OPTIONS);
  return session;
}
