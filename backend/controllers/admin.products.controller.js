import Product from "../module/product.model.js";
import mongoose from "mongoose";

//PRODUCTS ADMIN FUNCTIONS

export const getAdminPage = (req, res) => {
  return res.status(200).send("Admin Dashboard");
};

export const getAdminProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error(`Error fetching products: ${error.message}`);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const postAdminNewProduct = async (req, res) => {
  const product = req.body;
  const newProduct = new Product(product);

  try {
    await newProduct.save();
    //201 means smth created
    return res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error(`Error creating product: ${error.message}`);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteAdminProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  try {
    await Product.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error(`Error deleting product: ${error.message}`);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateAdminProduct = async (req, res) => {
  const { id } = req.params;
  //to get whatever admin wants to update
  const product = req.body;

  //to catch 404 case
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  try {
    //new: true so that it returns the updated product
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    return res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error(`Error updating product: ${error.message}`);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
