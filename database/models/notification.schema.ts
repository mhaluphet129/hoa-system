import mongoose from "mongoose";
import "@/database/models/user.schema";

const NoticationSchema = new mongoose.Schema(
  {
    type: {
      enum: ["due", "events"],
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["error", "pending", "success"],
      default: "pending",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    sub_title: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    extra: Object,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Notication ||
  mongoose.model("Notication", NoticationSchema);
