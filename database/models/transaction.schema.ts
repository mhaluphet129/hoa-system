import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    dateCollected: {
      type: Date,
      required: true,
    },
    collectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
    },
    paymentType: {
      type: String,
      enum: ["cash", "cheque"],
      default: "cash",
    },
    categorySelected: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);
