import * as z from "zod";

const blogSchema = z.object({
  category: z.string().min(3, "Category must be at least 3 characters"),
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug is required"),
  content: z.string(),
});

export { blogSchema };
