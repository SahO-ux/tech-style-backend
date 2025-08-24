import mongoose from "mongoose";

const cocoonUnits = ["kg", "tonne"];

const packingRecordSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true, default: Date.now },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cocoonType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CocoonType",
      required: true,
    },
    packed: {
      value: {
        type: Number,
        required: true,
        min: [0.01, "Packed quantity must be greater than 0"],
      },
      unit: {
        type: String,
        required: true,
        enum: cocoonUnits,
        default: "kg",
      },
    },
    totalPackers: { type: Number, required: true },
    notes: String,
  },
  { timestamps: true }
);

// Pre-save hook to calculate avgPackedPerPacker using packed & totalPackers entries
packingRecordSchema.pre("save", function (next) {
  if (this.totalPackers > 0) {
    this.avgPackedPerPacker = Number(
      (this.packed.quantity / this.totalPackers).toFixed(2)
    );
  } else {
    this.avgPackedPerPacker = 0;
  }
  next();
});

export default mongoose.model("PackingRecord", packingRecordSchema);
