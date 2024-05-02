import NextAuth, { Session, User, getServerSession } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Github from "next-auth/providers/github";

import { createId } from "@paralleldrive/cuid2";

import prisma from "@/db";

export const AUTH_OPTIONS = {
  adapter: <Adapter>PrismaAdapter(prisma),
  providers: [
    Github({
      clientId: process.env.GITHUB_ID!!,
      clientSecret: process.env.GITHUB_SECRET!!,
      allowDangerousEmailAccountLinking: true,
      async profile(profile) {
        // console.log(profile);
        const { name, email, avatar_url } = profile;
        const image = avatar_url;
        if (email) {
          const user = await prisma.user.findUnique({ where: { email } });
          if (user) {
            return {
              id: user.id,
              isAdmin: user.isAdmin,
              name: user.name,
              email: user.email,
              image: user.image,
            };
          }
        }
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
