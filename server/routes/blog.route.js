import express from "express";
import {
  blogAdd,
  blogAllShow,
  blogDelete,
  blogDetailsShow,
  blogDetailsSlugShow,
  blogEdit,
  blogShow,
  getBlogByCategory,
} from "../controllers/blog.controller.js";
import upload from "../config/multer.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const blogRouter = express.Router();

blogRouter.post("/add", authenticate, upload.single("file"), blogAdd);
blogRouter.put("/edit/:blogId", authenticate, upload.single("file"), blogEdit);
blogRouter.delete("/delete/:blogId", authenticate, blogDelete);
blogRouter.get("/show", authenticate, blogShow);
blogRouter.get("/get-all", blogAllShow);
blogRouter.get("/show/:blogId", authenticate, blogDetailsShow);

blogRouter.get("/show/slug-blog/:slug", blogDetailsSlugShow);
blogRouter.get("/get-blog/:category", getBlogByCategory);

export default blogRouter;
