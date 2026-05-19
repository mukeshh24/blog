import express from "express";
import {
  deleteUser,
  getAllUser,
  getUser,
  userGoogleLogin,
  userLogin,
  userLogout,
  userRegister,
  userUpdate,
} from "../controllers/user.controller.js";
import upload from "../config/multer.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.post("/google-login", userGoogleLogin);
userRouter.get("/logout", authenticate, userLogout);
userRouter.get("/get-user/:userId", authenticate, getUser);
userRouter.put(
  "/user-update/:userId",
  authenticate,
  upload.single("file"),
  userUpdate,
);
userRouter.get("/all-user", authenticate, getAllUser);
userRouter.delete("/user/:userId", authenticate, deleteUser);

export default userRouter;
