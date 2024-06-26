import mongoose from "mongoose";
import user_homeownerSchema from "./user_homeowner.schema";
import user_staffSchema from "./user_staff.schema";
import user_treasurerSchema from "./user_treasurer.schema";
import user_bodSchema from "./user_bod.schema";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["homeowner", "staff", "treasurer", "bod"],
    },
    homeownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: user_homeownerSchema,
    },
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: user_staffSchema,
    },
    treasurerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: user_treasurerSchema,
    },
    bodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: user_bodSchema,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      required: function (this: any) {
        return this.type === "homeowner";
      },
    },
    profileLink: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
