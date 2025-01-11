import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
});

const Role = mongoose.model("Role", roleSchema);
export default Role;
