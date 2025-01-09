import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";

//get .env to have access to the database URI
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.json()); //accept JSON files

//*USERS ROUTES
//get the homepage
app.get("/", (req, res) => {
  return res.status(200).send("Home page");
});
//get product by id
app.get("/product/:id", (req, res) => {
  const { id } = req.params;
  //check if the product id is valid
  //find the product
  //return product

  return res.status(200).send("Product");
});

//get the products list
app.get("/products", (req, res) => {
  return res.status(200).send("Product");
});

//get search result page
app.get("/products/search", (req, res) => {
  return res.status(200).send("Product");
});
//get checkout page
app.get("/checkout", (req, res) => {});

//post the order into the database
app.post("/confirmation", (req, res) => {});



//* ADMIN ROUTES
//this will require auth
app.get("/admin", (req, res) =>{
    const product = req.body;
})
app.post("/admin/newproduct", (req, res)=>{

})

app.listen(() => {
  connectDb();
  console.log("Server started at http://localhost:" + PORT);
});
