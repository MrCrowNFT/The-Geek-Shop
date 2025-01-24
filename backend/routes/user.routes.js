import express from "express";
import {
  getHomePage,
  userGetProductById,
  userGetProducts,
  userSearch,
} from "../controllers/user.controller.js";
import { createUser, userLogin } from "../user.login.controller.js";

const userRouter = express.Router();

//*USERS ROUTES
userRouter.get("/", getHomePage);

userRouter.get("/products", userGetProducts);

userRouter.get("/products/:id", userGetProductById);

//*USER LOGIN ROUTES
//the idea is that for buying the must be logged in
userRouter.post("/login", userLogin)
userRouter.post("/createAccount", createUser)

//*This methods need some work, need to get payment method thingy as well as
//*elavorate on the categories to make a search

//get search result page
userRouter.get("/search", userSearch);

//get checkout page for payment
userRouter.get("/checkout", (req, res) => {});

//post the order into the database, this should be effective after the payment is confirmed
userRouter.post("/confirmation", (req, res) => {});

export default userRouter;
