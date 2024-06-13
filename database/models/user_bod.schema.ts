import mongoose from "mongoose";

const bodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

export default mongoose.models.Bod || mongoose.model("Bod", bodSchema);
