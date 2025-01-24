import Role from "./module/role.model";

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
    console.error(`Error during admin login: ${error.message}`);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createUser = async (req, res) => {};
