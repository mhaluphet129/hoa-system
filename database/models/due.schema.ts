import mongoose from "mongoose";
import "../models/user_homeowner.schema";
import "../models/category.schema";

const DueSchema = new mongoose.Schema(
  {
    homeownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "homeowners",
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
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

export default mongoose.models.Due || mongoose.model("Due", DueSchema);
