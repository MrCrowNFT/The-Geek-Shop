import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import Product from "./module/product.model.js";

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
    return res.status(200).send("Admin Page")
})

app.get("/admin/products", async (req, res)=>{
    try{
        const products = await Product.find({});
        return res.status(200).json({success: true, data: products});
    }catch(error){
        console.error(`Error fetching products: ${error.message}`);
        return res.status(500).json({success: false, message: "Server error"});
    }
})

app.post("/admin/newproduct", async (req, res)=>{
    const product = req.body;
    const newProduct = new Product(product);

    try{
        await newProduct.save();
        //201 means smth created 
        return res.status(201).json({success: true, data: newProduct});
    } catch(error){
        console.error(`Error creating product: ${error.message}`);
        return res.status(500).json({success: false, message: "Server error"});
    }
})

app.delete("/admin/:id", async (req, res)=>{
    const {id} = req.params;
    try{
        await Product.findByIdAndDelete(id);
        return res.status(200).json({success: true, message: "Product deleted"});
    }catch(error){
        console.error(`Error deleting product: ${error.message}`);
        return res.status(404).json({success: false, message: "Product not found"});
    }
})

app.put("/admin/:id", async (req, res)=>{
    const {id} = req.params;

})

app.listen(() => {
  connectDb();
  console.log("Server started at http://localhost:" + PORT);
});
