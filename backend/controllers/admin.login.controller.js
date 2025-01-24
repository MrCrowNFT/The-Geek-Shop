import Role from "../module/role.model.js";
import jwt from "jsonwebtoken";

//ADMIN LOGIN METHODS

export const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    //find the username in the database
    const admin = await Role.findOne({ username });
    if (!admin || (admin.role !== "admin" && admin.role !== "super_admin")) {
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

//This is only accesable to super admin thanks auth middleware
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
      data: { id: newAdmin._id, username: newAdmin.username, role: newAdmin.role },
    });
  } catch (error) {
    console.error(`Error creating Admin: ${error.message}`);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const changeAdminPassword = async (req, res) => {
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
