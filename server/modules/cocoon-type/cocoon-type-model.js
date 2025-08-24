import mongoose from "mongoose";

const cocoonTypeEnums = ["E10", "P10"];
const cocoonDimensionsEnum = ["cm", "mm"];

const cocoonTypeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: { type: String, required: true, enum: cocoonTypeEnums },
    description: { type: String, trim: true },
    dimensions: {
      length: Number,
      breadth: Number,
      unit: cocoonDimensionsEnum,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CocoonType", cocoonTypeSchema);
