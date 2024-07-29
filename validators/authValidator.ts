import { z } from "zod"

// Register Validator
export const registerValidator = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email" }),
    password: z.string().min(1, { message: "Password is required" }),
    password_confirmation: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.password_confirmation
    },
    {
      message: "Passwords must match",
      path: ["password_confirmation"],
    }
  )

// Login Validator
export const loginValidator = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z.string().min(1, { message: "Password is required" }),
  remember_me: z.boolean().optional(),
})

// Forgot Password validator
export const forgotPasswordValidator = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
})
