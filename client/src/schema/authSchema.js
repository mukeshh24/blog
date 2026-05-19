import * as z from "zod";

const signUpSchema = z.object({
  userName: z.string().min(3, "Name must be at least 3 characters"),
  userEmail: z.string().email("Invalid email address"),
  userPassword: z.string().min(3, "Password must be at least 3 characters"),
});

const signInSchema = z.object({
  userEmail: z.string().email("Invalid email address"),
  userPassword: z.string().min(3, "Password must be at least 3 characters"),
});

const userProfileSchema = z.object({
  userName: z.string().min(3, "Name must be at least 3 characters"),
  userEmail: z.string().email("Invalid email address"),
  userPassword: z.string(),
  userBio: z.string().min(3, "Password must be at least 3 characters"),
});

export { signUpSchema, signInSchema, userProfileSchema };
