import Order from "../module/order.model.js";
import mongoose from "mongoose";

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
