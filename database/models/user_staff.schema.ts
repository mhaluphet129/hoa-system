import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

export default mongoose.models.Staff || mongoose.model("Staff", StaffSchema);
