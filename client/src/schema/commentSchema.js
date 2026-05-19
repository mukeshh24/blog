import * as z from "zod";

const commentSchema = z.object({
  comment: z.string().min(3, "Comment is required"),
});

export { commentSchema };
