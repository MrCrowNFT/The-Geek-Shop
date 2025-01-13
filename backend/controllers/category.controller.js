import Category from "../module/category.model";

const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    //check if req has name
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    //check for dups
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    //create the new category
    const newCategory = new Category({ name, description });
    await newCategory.save();
    return res.status(201).json({
      success: true,
      data: newCategory,
    });
  } catch (error) {
    console.error(`Error adding category: ${error.message}`);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
