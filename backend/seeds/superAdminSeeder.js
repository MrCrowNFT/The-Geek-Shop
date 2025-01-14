import Role from "../module/role.model";
import connectDb from "../config/db";
import dotenv from "dotenv";

dotenv.config();

const seedSuperAdmin = async () => {
  try {
    //Check if super admin has already been created
    const existingSuperAdmin = await Role.findOne({ role: "super_admin" });
    if (existingSuperAdmin) {
      console.log("Super Admin already exist");
      process.exit(0);
    }
    //probably should put this on the dotenv
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
    process.exit(1);
  }
};

// Run seed script
const runSeed = async () => {
  await connectDb();
  await seedSuperAdmin();
};

runSeed();
