import { z } from "zod";

export const SignupValidation = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").max(265, "Password must not exceed 265 characters"),
});
