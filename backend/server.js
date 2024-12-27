import express from "express";
import dotenv from "dotenv";

//Load .env variables (variables still not added)
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.json()); //to accept JSON files

app.get("/", (req, res) =>{
    return res.status(200).send("Home Page")
})

app.listen(PORT, ()=>{
    console.log("Server started at http://localhost:" + PORT)
})