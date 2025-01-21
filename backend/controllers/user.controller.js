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

  try {
    //new: true so that it returns the updated product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error(`Error updating product: ${error.message}`);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

//this method will be used for product search and advanced search, therfor
//some params in the request query may be empty
export const userSearch = async (req, res) => {
  try {
    const { categories, minPrice, maxPrice } = req.query;

    //we'll use a dynamic query
    const query = {};

    if (categories) {
      const categoriesIds = categories.split(","); //Parse coma separeted values
      query.category = { $in: categoriesIds }; // filter
    }

    if (minPrice || maxPrice) {
      query.priceTag = {};
      if (minPrice) query.priceTag.$gte = Number(minPrice);
      if (maxPrice) query.priceTag.$lte = Number(maxPrice);
    }

    //populate to get full category document from the Category collection. is it necesary though?
    const products = await Product.find(query).populate("category");

    if (!products.length) {
      return res.status(404).json({
        success: false,
        message: "No products found matching the search criteria.",
      });
    }

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error(`Error during product search: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
