import mongoose from "mongoose";

const TreasurerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requried: true,
    },
    account_balance: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

export default mongoose.models.Treasurer ||
  mongoose.model("Treasurer", TreasurerSchema);
