import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import categoryRouter from "./routes/category.route.js";
import blogRouter from "./routes/blog.route.js";
import commentRouter from "./routes/comment.route.js";
import likeRouter from "./routes/like.route.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://blog-rho-nine-41.vercel.app"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blog", blogRouter);
app.use("/api/comment", commentRouter);
app.use("/api/like", likeRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error!";

  res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message: message,
  });
});

export default app;
