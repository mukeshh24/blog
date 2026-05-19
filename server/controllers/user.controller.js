import errorHandler from "../helpers/errorHandler.js";
import { generateToken } from "../helpers/jwtHandler.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import cloudinary from "../config/cloudinary.js";

const userRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(errorHandler(400, "All fields are required!"));
    }

    const checkUserIsExists = await User.findOne({ email });
    if (checkUserIsExists) {
      return next(errorHandler(400, "User already registered!"));
    }

    const hashPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({ name, email, password: hashPassword });

    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "Registered successfully!" });
  } catch (error) {
    next(error);
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(errorHandler(400, "All fields are required!"));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "Invalid credentials!"));
    }

    const comparePassword = await bcryptjs.compare(password, user.password);
    if (!comparePassword) {
      return next(errorHandler(404, "Invalid credentials!"));
    }

    const token = generateToken({
      _id: user._id,
      name: user.name,
      email: user.email,
    });

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const userData = user.toObject({ getters: true });
    delete userData.password;

    res.status(200).json({
      success: true,
      message: "Login successfully!",
      user: userData,
    });
  } catch (error) {
    next(error);
  }
};

const userGoogleLogin = async (req, res, next) => {
  try {
    const { name, email, avatar } = req.body;

    if (!email) {
      return next(errorHandler(400, "Email are required!"));
    }

    let user;
    user = await User.findOne({ email });
    if (!user) {
      const generatePassword = String(Math.round(Math.random() * 10000000));
      const hashPassword = await bcryptjs.hash(generatePassword, 10);

      const newUser = new User({ name, email, password: hashPassword, avatar });

      user = await newUser.save();
    }

    const token = generateToken({
      _id: user._id,
      name: user.name,
      email: user.email,
    });

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const userData = user.toObject({ getters: true });
    delete userData.password;

    res.status(200).json({
      success: true,
      message: "Login successfully!",
      user: userData,
    });
  } catch (error) {
    next(error);
  }
};

const userLogout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Logout successfully!",
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return next(errorHandler(400, "UserId are required!"));
    }

    const userData = await User.findOne({ _id: userId }).lean().exec();
    if (!userData) {
      return next(errorHandler(404, "User not found!"));
    }

    res.status(200).json({
      success: true,
      message: "User found successfully!",
      user: userData,
    });
  } catch (error) {
    next(error);
  }
};

const userUpdate = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const data = JSON.parse(req.body.data);

    if (!userId) {
      return next(errorHandler(400, "UserId are required!"));
    }

    const userData = await User.findById(userId);
    if (!userData) {
      return next(errorHandler(404, "User not found!"));
    }

    userData.name = data.name;
    userData.email = data.email;
    userData.bio = data.bio;
    if (data.password && data.password.length >= 3) {
      const hashPassword = await bcryptjs.hash(data.password, 10);
      userData.password = hashPassword;
    }

    // upload file
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "blog",
        resource_type: "auto",
      });

      userData.avatar = uploadResult.secure_url;
    }

    await userData.save();

    const userDataRemovePassword = userData.toObject({ getters: true });
    delete userDataRemovePassword.password;

    res.status(200).json({
      success: true,
      message: "User update successfully!",
      user: userDataRemovePassword,
    });
  } catch (error) {
    next(error);
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const userData = await User.find().sort({ createdAt: -1 });
    if (!userData) {
      return next(errorHandler(404, "User not found!"));
    }

    res.status(200).json({
      success: true,
      message: "User found successfully!",
      user: userData,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return next(errorHandler(400, "UserId are required!"));
    }

    const userData = await User.findByIdAndDelete(userId);
    if (!userData) {
      return next(errorHandler(404, "User not found!"));
    }

    res.status(200).json({
      success: true,
      message: "User delete successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export {
  userRegister,
  userLogin,
  userGoogleLogin,
  userLogout,
  getUser,
  userUpdate,
  getAllUser,
  deleteUser,
};
