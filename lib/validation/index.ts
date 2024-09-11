import { z } from "zod";

export const SignupValidation = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").max(265, "Password must not exceed 265 characters"),
});


export const SignInValidation = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
});


export const CreatePostValidation = z.object({
  caption: z
    .string()
    .min(1, { message: "Caption is required." })
    .max(200, { message: "Caption should not exceed 200 characters." }),
  location: z.string().optional(),
  tags: z
    .string()
    .optional()
    .refine((val) => {
      return val === "" || /^[a-zA-Z0-9]+(,\s*[a-zA-Z0-9]+)*$/
    }, { message: "Tags should be separated by commas (e.g., 'React, Next.js')." }),
});
