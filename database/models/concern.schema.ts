import mongoose from "mongoose";
import "@/database/models/user_homeowner.schema";

const ConcernSchema = new mongoose.Schema(
  {
    homeownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HomeOwner",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    resolved: {
      type: Boolean,
      default: false,
    },
    image: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Concern ||
  mongoose.model("Concern", ConcernSchema);
