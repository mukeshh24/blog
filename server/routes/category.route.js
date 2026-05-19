import express from "express";
import {
  categoryAdd,
  categoryDelete,
  categoryDetailsShow,
  categoryEdit,
  categoryShow,
} from "../controllers/category.controller.js";
import { authenticateAdmin } from "../middlewares/auth.middleware.js";

const categoryRouter = express.Router();

categoryRouter.post("/add", authenticateAdmin, categoryAdd);
categoryRouter.put("/edit/:categoryId", authenticateAdmin, categoryEdit);
categoryRouter.delete("/delete/:categoryId", authenticateAdmin, categoryDelete);
categoryRouter.get("/show/:categoryId", authenticateAdmin, categoryDetailsShow);
categoryRouter.get("/show", categoryShow);

export default categoryRouter;
