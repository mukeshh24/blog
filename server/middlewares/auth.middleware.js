import errorHandler from "../helpers/errorHandler.js";
import jwt from "jsonwebtoken";

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return next(errorHandler(403, "Unauthorized!"));
    }

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decodeToken;
    next();
  } catch (error) {
    next(error);
  }
};

const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return next(errorHandler(403, "Unauthorized!"));
    }

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

    if (decodeToken?.role === "admin") {
      req.user = decodeToken;
      next();
    } else {
      return next(errorHandler(403, "Unauthorized!"));
    }
  } catch (error) {
    next(error);
  }
};

export { authenticate, authenticateAdmin };
