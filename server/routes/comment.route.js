import express from "express";
import {
  commentAdd,
  commentAllShow,
  commentCount,
  commentDelete,
  commentShow,
} from "../controllers/comment.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const commentRouter = express.Router();

commentRouter.post("/add", authenticate, commentAdd);
commentRouter.get("/get/:blogId", commentShow);
commentRouter.get("/get-count/:blogId", commentCount);
commentRouter.get("/all-comment", authenticate, commentAllShow);
commentRouter.delete("/delete/:commentId", authenticate, commentDelete);

export default commentRouter;
