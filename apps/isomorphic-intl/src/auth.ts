import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

import { AuthService } from "./server/service/auth/auth.service"

const auth: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const response = await AuthService.loginWithGoogle({
            email: user.email!,
            provider: "google",
            token: account.access_token,
          })

          if (response && response.token) {
            user.token = response.token
            return true
          }
          return false
        } catch (error) {
          // @ts-nocheck
          console.error("Error during Google sign in:", error)
          return false
        }
      }
      return true
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
        roles: token.roles as string[],
        token: token.accessToken as string,
        avatar: token.avatar as string,
        permissions: token.permissions as string[],
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.roles = user.roles
        token.accessToken = user.token
        token.avatar = user.avatar
        token.permissions = user.permissions
      }
      return token
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
        twoFactorCode: { type: "twoFactorCode" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid credentials")
        }

        try {
          const response = await AuthService.login({
            email: credentials.email,
            password: credentials.password,
            twoFactorCode: credentials.twoFactorCode,
          })

          if (!response || !response.token) {
            return null
          }

          return {
            id: response.data.userId,
            email: response.data.applicationUser.email,
            name:
              response.data.firstName || response.data.applicationUser.username,
            token: response.token,
            avatar: response.data.profilePicturePath || "",
            roles: response.data.roles || [],
            permissions: [],
          }
        } catch (error: any) {
          console.error("Auth error:", error.response?.data || error)
          const outputMsg =
            error.response?.data?.message || "Authentication failed"
          throw new Error(outputMsg)
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === "development",
}

export default auth
