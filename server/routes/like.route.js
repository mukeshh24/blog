import express from "express";
import { likeAdd, likeCount } from "../controllers/like.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const likeRouter = express.Router();

likeRouter.post("/add", authenticate, likeAdd);
likeRouter.get("/get-like/:blogId", likeCount);

export default likeRouter;
