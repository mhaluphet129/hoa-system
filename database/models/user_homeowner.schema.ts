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
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    homeNumber: {
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
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    immediateFamily: Array,
    // {
    //   name: string,
    //   age: number
    // }
    currentEmployer: String || Number,
    businessName: String,
    workPosition: String,
    spouseName: String,
    spouseNumber: Number,
    monthly_due: Number,
    annual_membership_fee: Number,
    profile_description: String,
  },
  {
    timestamps: false,
  }
);

export default mongoose.models.HomeOwner ||
  mongoose.model("HomeOwner", HomeOwnerSchema);
