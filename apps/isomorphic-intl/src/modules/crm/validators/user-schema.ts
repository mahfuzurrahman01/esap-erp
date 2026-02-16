import { z } from "zod"

import { messages } from "@/config/messages"

export const userCreateFormSchema = z.object({
  firstName: z.string().min(1, messages.firstNameRequired),
  lastName: z.any().optional(),
  otp: z.string().optional(),
  email: z.string().min(1, messages.passwordRequired),
  // password: z
  //     .string()
  //     .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  //     .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  //     .regex(/[0-9]/, "Password must contain at least one number")
  //     .regex(
  //       /[^a-zA-Z0-9]/,
  //       "Password must contain at least one special character"
  //     )
  //     .min(8, "Password must be at least 8 characters long"),
  roleIds: z.array(z.string()).min(1, messages.roleIsRequired),
  phoneNumber: z.string().min(1, messages.phoneNumberIsRequired),
  country: z.number().min(1, messages.countryIsRequired),
  address: z.string().optional(),
  type: z.string().optional(),
  password: z.string().optional(),
  isNotify: z.any().optional(),
  applicationUser: z.object({
    twoFactorEnabled: z.boolean().optional(),
  }),
  file: z.any().optional(),
  coverPhoto: z.any().optional(),
})

export type UserCreateFormTypes = z.infer<typeof userCreateFormSchema>
