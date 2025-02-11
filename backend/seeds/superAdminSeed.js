import mongoose from "mongoose";
import Role from "../module/role.model.js";
import connectDb from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

const seedSuperAdmin = async () => {
  try {
    const existingSuperAdmin = await Role.findOne({ role: "super_admin" });

    if (existingSuperAdmin) {
      console.log("Super Admin already exists");
      process.exit(0);
    }
    const superAdmin = new Role({
      username: process.env.SUPER_ADMIN_USERNAME,
      password: process.env.SUPER_ADMIN_PASSWORD,
      role: "super_admin",
    });

    await superAdmin.save();
    console.log("Super admin created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error.message);
    console.error(error.stack);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Database connection closed.");
  }
};

// Run seed script
const runSeed = async () => {
  await connectDb();
  await seedSuperAdmin();
};

runSeed();
