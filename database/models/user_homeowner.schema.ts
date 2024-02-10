import mongoose from "mongoose";

const HomeOwnerSchema = new mongoose.Schema(
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
    move_in_date: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["owner", "renter"],
    },
    spouse_name: String,
    spouse_number: Number,
    monthly_due: {
      type: Number,
      required: true,
    },
    annual_membership_fee: {
      type: Number,
      required: true,
    },
    profile_description: String,
  },
  {
    timestamps: false,
  }
);

export default mongoose.models.HomeOwner ||
  mongoose.model("HomeOwner", HomeOwnerSchema);
