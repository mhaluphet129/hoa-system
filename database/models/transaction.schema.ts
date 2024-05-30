import mongoose from "mongoose";
import "@/database/models/category.schema";
import "@/database/models/user_homeowner.schema";

const TransactionSchema = new mongoose.Schema(
  {
    homeownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HomeOwner",
    },
    dateCollected: Date,
    collectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
    },
    paymentType: {
      type: String,
      enum: ["cash", "cheque"],
    },
    categorySelected: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    ],
    status: {
      type: String,
      enum: ["completed", "pending"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);
