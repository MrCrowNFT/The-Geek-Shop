import express from "express"
import Product from "../module/product.model";
import Order from "../module/order.model";

const userRouter = express.Router();

//*USERS ROUTES
//get the homepage
userRouter.get("/", (req, res) => {
    return res.status(200).send("Home page");
  });
  
  userRouter.get("/products", async (req, res) => {
      try{
          const products = await Product.find({});
          return res.status(200).json({success: true, data: products});
      }catch(error){
          console.error(`Error fetching products: ${error.message}`);
          return res.status(500).json({success: false, message: "Server error"});
      }
  });
  
  userRouter.get("/products/:id", async (req, res) => {
      const {id} = req.params;
  
      //to catch 404 case 
      if (!mongoose.Types.ObjectId.isValid(id)){
          return res.status(404).json({success: false, message: "Product not found"});
      }
  
      try{
          //new: true so that it returns the updated product 
          const product = await Product.findById(id);
          return res.status(200).json({success: true, data: product});
      }catch(error){
          console.error(`Error updating product: ${error.message}`);
          return res.status(500).json({success: false, message: "Server error"});
      }
  });
  
  //*This methods need some work, need to get payment method thingy as well as  
  //*elavorate on the categories to make a search 
  
  //get search result page
  userRouter.get("/products/search", (req, res) => {
    return res.status(200).send("Product");
  });
  
  //get checkout page
  userRouter.get("/checkout", (req, res) => {});
  
  //post the order into the database
  userRouter.post("/confirmation", (req, res) => {});

  export default userRouter;