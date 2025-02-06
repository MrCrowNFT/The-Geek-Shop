import Role from "../module/role.model.js";
import jwt from "jsonwebtoken";

export const userLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Role.findOne({ username });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Username or password" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Username or password" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error(`Error during user login: ${error.message}`);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required.",
      });
    }

    const existingUser = await Role.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username already in use",
      });
    }

    //create new user
    const newUser = new Role({ username, password, role: "user" });
    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "New User created successfully",
      data: { id: newUser._id, username: newUser.username, role: newUser.role },
    });
  } catch (error) {
    console.error(`Error creating User: ${error.message}`);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
