import mongoose from "mongoose";

const cocoonUnits = ["kg", "tonne"];

const stockSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    readyStock: {
      type: [
        {
          cocoonType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CocoonType",
            required: true,
          },
          quantity: { type: Number, required: true, min: 0, default: 0 },
          unit: {
            type: String,
            required: true,
            enum: cocoonUnits,
            default: "kg",
          },
        },
      ],
      default: [],
    },
    updatedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Stock", stockSchema);
