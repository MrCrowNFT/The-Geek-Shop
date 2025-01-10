import express from "express";
import {
  adminLogin,
  deleteAdminProduct,
  getAdminOrderById,
  getAdminOrders,
  getAdminPage,
  getAdminProducts,
  postAdminNewProduct,
  updateAdminOrder,
  updateAdminProduct,
} from "../controllers/admin.controller";

const adminRouter = express.Router();

//* ADMIN ROUTES
//this will require auth middleware

//PRODUCTS ADMIN ROUTES
adminRouter.post("/login", adminLogin);

adminRouter.get("/dashboard", getAdminPage);

adminRouter.get("/products", getAdminProducts);

adminRouter.post("/products/newproduct", postAdminNewProduct);

adminRouter.delete("/products/:id", deleteAdminProduct);

adminRouter.put("/products/:id", updateAdminProduct);

//ORDERS ADMIN ROUTES

adminRouter.get("/orders", getAdminOrders);

adminRouter.get("/orders/:id", getAdminOrderById);

//For updating the order status manually untill aliScrapper is ready
adminRouter.put("/orders/:id", updateAdminOrder);

export default adminRouter;
