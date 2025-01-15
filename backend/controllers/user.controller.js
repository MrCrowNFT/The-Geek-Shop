import Product from "../module/product.model.js";

//USER METHODS

export const getHomePage = (req, res) => {
  return res.status(200).send("Home page");
};

export const userGetProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error(`Error fetching products: ${error.message}`);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const userGetProductById = async (req, res) => {
  const { id } = req.params;

  //to catch 404 case
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  try {
    //new: true so that it returns the updated product
    const product = await Product.findById(id);
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error(`Error updating product: ${error.message}`);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
