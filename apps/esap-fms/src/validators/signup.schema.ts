import { z } from "zod"

export const signUpSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    phoneNumber: z.string().min(1, "Mobile number is required"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character"
      )
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

// Define TypeScript type from the schema
export type SignUpSchema = z.infer<typeof signUpSchema>
