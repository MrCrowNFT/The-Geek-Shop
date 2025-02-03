import express from "express";

import { verifyAdmin, verifySuperAdmin } from "../middleware/auth.js";
import {
  adminLogin,
  changeAdminPassword,
  newAdmin,
} from "../controllers/admin.login.controller.js";
import {
  deleteAdminProduct,
  getAdminPage,
  postAdminNewProduct,
  updateAdminProduct,
} from "../controllers/admin.products.controller.js";
import {
  adminOrderSearch,
  getAdminOrderById,
  getAdminOrders,
  updateAdminOrder,
} from "../controllers/admin.orders.controller.js";

const adminRouter = express.Router();

//PRODUCTS ADMIN ROUTES
adminRouter.post("/login", adminLogin);

adminRouter.post("/newAdmin", verifyAdmin, verifySuperAdmin, newAdmin);

adminRouter.put("/newPassword", verifyAdmin, changeAdminPassword);

adminRouter.get("/dashboard", verifyAdmin, getAdminPage);

adminRouter.get("/products", verifyAdmin, getAdminPage);

adminRouter.post("/products/newproduct", verifyAdmin, postAdminNewProduct);

adminRouter.delete("/products/:id", verifyAdmin, deleteAdminProduct);

adminRouter.put("/products/:id", verifyAdmin, updateAdminProduct);

//ORDERS ADMIN ROUTES

adminRouter.get("/orders", verifyAdmin, getAdminOrders);

adminRouter.get("/orders/:id", verifyAdmin, getAdminOrderById);

adminRouter.get("/orders/search", verifyAdmin, adminOrderSearch);

//For updating the order status manually untill aliScrapper is ready
adminRouter.put("/orders/:id", verifyAdmin, updateAdminOrder);

export default adminRouter;
