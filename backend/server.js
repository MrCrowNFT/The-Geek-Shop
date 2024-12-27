import express from "express";
import dotenv from "dotenv";

//Load .env variables (variables still not added)
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.json()); //to accept JSON files

//USER ROUTES
app.get("/", (req, res) => {
  return res.status(200).send("Home Page");
});
app.get("/products", (req, res) => {
  return res.status(200).send("Products");
});
app.get("products/search", (req, res) => {
  //need to recieve user query
});
app.get("/products/:id", (req, res) => {
  const { id } = req.params;

  //check if product is valid

  //find the product by id

  //return product
});
app.get("/checkout", (req, res) => {});
app.post("/checkout", (req, res) => {
  //add to orders clusters
});

//ADMIN ROUTES
app.get("/admin", (req, res) => {
  return res.status(200).send("ADMIN DASHBOARD");
});
app.post("/admin/products/new", (req, res) => {
  //add new product to products cluster
});
app.put("/admin/products/:id/edit", (req, res) => {
  const { id } = req.params;
  //check if product is valid

  //find the product by id

  //update product in products cluster
});
app.get("/admin/orders", (req, res) => {
  return res.status(200).send("ADMIN ORDERS");
});
app.get("/admin/analytics", (req, res) => {
  return res.status(200).send("ADMIN ANALYTICS");
});

app.listen(PORT, () => {
  console.log("Server started at http://localhost:" + PORT);
});
