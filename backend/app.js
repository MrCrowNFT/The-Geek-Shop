import express from "express";

import adminRouter from "./routes/admin.routes.js";
import userRouter from "./routes/user.routes.js";
import categoryRouter from "./routes/category.routes.js";

const app = express();

app.use(express.json()); //accept JSON files

app.use("/home", userRouter);
app.use("/admin", adminRouter);
app.use("/categories", categoryRouter);

export default app;

