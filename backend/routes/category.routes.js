import express from "express";
import { verifyAdmin } from "../middleware/auth";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/category.controller";

const categoryRouter = express.Router();

categoryRouter.get("/", verifyAdmin, getAllCategories);
categoryRouter.post("/add", verifyAdmin, addCategory);
categoryRouter.put("/:id", verifyAdmin, updateCategory);
categoryRouter.delete("/:id", verifyAdmin, deleteCategory);

export default categoryRouter;
