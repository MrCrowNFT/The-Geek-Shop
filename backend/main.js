import express from "express";
import dotenv from "dotenv";

const app = express();

app.use(express.json()); //accept JSON files

//USERS ROUTES


app.listen(()=>{
    console.log("Server started at http://localhost:5500");
});
