// src/lib/auth.ts

import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id
        // Fetch credits from database
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { credits: true, plan: true }
        })
        session.user.credits = dbUser?.credits ?? 0
        session.user.plan = dbUser?.plan ?? "FREE"
      }
      return session
    },
  },
  pages: {
    signIn: "/",
  },
}
