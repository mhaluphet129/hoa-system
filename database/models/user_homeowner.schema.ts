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
    address: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["owner", "renter"],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
  },
  {
    timestamps: false,
  }
);

export default mongoose.models.HomeOwner ||
  mongoose.model("HomeOwner", HomeOwnerSchema);
