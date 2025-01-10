import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";

import adminRouter from "./routes/admin.routes.js";
import userRouter from "./routes/user.routes.js";

//get .env to have access to the database URI
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.json()); //accept JSON files

app.use("/home", userRouter);
app.use("/admin", adminRouter);

app.listen(() => {
  connectDb();
  console.log("Server started at http://localhost:" + PORT);
});
