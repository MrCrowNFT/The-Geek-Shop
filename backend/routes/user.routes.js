import express from "express";
import {
  getHomePage,
  userGetProductById,
  userGetProducts,
  userSearch,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

//*USERS ROUTES
userRouter.get("/", getHomePage);

userRouter.get("/products", userGetProducts);

userRouter.get("/products/:id", userGetProductById);

//*This methods need some work, need to get payment method thingy as well as
//*elavorate on the categories to make a search
//*Probably make it it's own controller

//get search result page
userRouter.get("/products/search", userSearch);

//get checkout page for payment
userRouter.get("/checkout", (req, res) => {});

//post the order into the database, this should be effective after the payment is confirmed
userRouter.post("/confirmation", (req, res) => {});

export default userRouter;
