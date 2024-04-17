import mongoose from "mongoose";

const ConcernSchema = new mongoose.Schema(
  {
    homeownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "homeowners",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Concern ||
  mongoose.model("Concern", ConcernSchema);
