import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import Product from "./module/product.model.js";
import mongoose from "mongoose";

//get .env to have access to the database URI
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.json()); //accept JSON files

app.listen(() => {
  connectDb();
  console.log("Server started at http://localhost:" + PORT);
});
