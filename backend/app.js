import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import DBConnection from "./config/DBConnection.js";

// env configration
dotenv.config();

const app = express();

// DB called
DBConnection();

// miidlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// routes
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API running successfully!",
  });
});

export default app;
