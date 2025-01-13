import Product from "../module/product.model.js";
import Order from "../module/order.model.js";
import Role from "../module/role.model.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

//ADMIN CONFIG METHODS

export const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    //find the username in the database
    const admin = await Role.findOne({ username });
    if (!admin || admin.role !== "admin") {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    //validate the password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Username or password" });
    }

    //if is admin and password is okay we generate a jwt
    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Respond with the token
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error(`Error during admin login: ${error.message}`);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const newAdmin = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    //Validate fields
    if (!username || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Username, password, and role are required.",
      });
    }

    //check if username is already in use
    const existingAdmin = await Role.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin with this username already exists.",
      });
    }

    //Create a new Admin
    const newAdmin = new Role({ username, password, role });
    await newAdmin.save();
    return res.status(201).json({
      success: true,
      message: "New admin created successfully",
      data: newAdmin,
    });
  } catch (error) {
    console.error(`Error creating Admin: ${error.message}`);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const changeAdminConfig = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    //extracting the id from the jwt by verifyAdmin middleware
    const adminId = req.user.id;

    //validate body
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required.",
      });
    }

    const admin = await Role.findById(adminId);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    //update password
    admin.password = newPassword;
    await admin.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    console.error(`Error changing password: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

//PRODUCTS ADMIN FUNCTIONS

export const getAdminPage = (req, res) => {
  return res.status(200).send("Admin Page");
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

//ORDERS ADMIN FUNCTIONS
export const getAdminOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error(`Error fetching orders: ${error.message}`);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAdminOrderById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }
  try {
    const order = await Order.findById(id);
    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error(`Error fetching orders: ${error.message}`);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateAdminOrder = async (req, res) => {
  const { id } = req.params;
  const order = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, order, {
      new: true,
    });
    return res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    console.error(`Error updating orders: ${error.message}`);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
