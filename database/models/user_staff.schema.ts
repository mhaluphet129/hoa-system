import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    middlename: String,
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    move_in_date: Date,
    type: {
      type: String,
      required: true,
      enum: ["owner", "renter"],
    },
    spouse_name: String,
    spouse_number: String,
    monthly_due: {
      type: Number,
      required: true,
    },
    annual_membership_fee: {
      type: Number,
      required: true,
    },
    profile_description: String,
    // role: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    timestamps: false,
  }
);

export default mongoose.models.Staff || mongoose.model("Staff", StaffSchema);
