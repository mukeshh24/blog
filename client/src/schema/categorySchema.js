import * as z from "zod";

const categorySchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug is required"),
});

export { categorySchema };
