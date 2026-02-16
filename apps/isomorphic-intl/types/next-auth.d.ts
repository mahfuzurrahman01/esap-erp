import { DefaultSession } from "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      roles: string[]
      token: string
      avatar: string
      permissions: string[]
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    name: string
    email: string
    roles: string[]
    token: string
    avatar: string
    permissions: string[]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    name: string
    email: string
    roles: string[]
    token: string
    avatar: string
    permissions: string[]
  }
}
