import mongoose from "mongoose";
import Role from "../module/role.model.js";
import connectDb from "../config/db.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const seedSuperAdmin = async () => {
  try {
    //Check if super admin has already been created
    const existingSuperAdmin = await Role.findOne({ role: "super_admin" });
    if (existingSuperAdmin) {
      console.log("Super Admin already exist");
      process.exit(0);
    }

    //need to hash it beforehand because the .save pre hashing method only works on
    //new or modified password when interacting with the API
    const hashedPassword = await bcrypt.hash(
      process.env.SUPER_ADMIN_PASSWORD,
      10
    );

    const superAdmin = new Role({
      username: process.env.SUPER_ADMIN_USERNAME,
      password: hashedPassword,
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
