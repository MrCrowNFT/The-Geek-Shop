import express from "express";
import dotenv from "dotenv";

const app = express();

app.use(express.json()); //accept JSON files

//*USERS ROUTES
//get the homepage
app.get("/", (req, res)=>{
    return res.status(200).send("Home page");
})
//get product by id
app.get("/product/:id", (req, res)=>{
    const {id} = req.params;
    //check if the product id is valid
    //find the product 
    //return product

    return res.status(200). send("Product")
})

//get the products list
app.get("/products", (req, res)=>{
    return res.status(200). send("Product")
})

//get search result page 
app.get("/products/search", (req, res)=>{
    return res.status(200). send("Product")
})
//get checkout page
app.get("/checkout", (req, res)=>{})

//post the order into the database
app.post("/confirmation", (req, res)=>{})




app.listen(()=>{
    console.log("Server started at http://localhost:5500");
});
