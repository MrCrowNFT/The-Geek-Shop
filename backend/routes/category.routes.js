import express from "express";
import { verifyAdmin } from "../middleware/auth.js";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/category.controller.js";

const categoryRouter = express.Router();

categoryRouter.get("/", verifyAdmin, getAllCategories);
categoryRouter.post("/add", verifyAdmin, addCategory);
categoryRouter.put("/:id", verifyAdmin, updateCategory);
categoryRouter.delete("/:id", verifyAdmin, deleteCategory);

export default categoryRouter;
