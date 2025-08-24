import mongoose from "mongoose";

const cocoonUnits = ["kg", "tonne"];
const orderStatuses = Object.freeze({
  PENDING: "pending",
  DELIVERED: "delivered",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    cocoonType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CocoonType",
      required: true,
    },
    weight: {
      value: {
        type: Number,
        required: true,
        min: [0.01, "Weight must be greater than 0"],
      },
      unit: { type: String, required: true, enum: cocoonUnits, default: "kg" },
    },
    challanNo: { type: String, required: true, trim: true, unique: true },
    remarks: { type: String, max: 50, optional: true },
    pricePerUnit: {
      type: Number,
      required: true,
      min: [0.01, "Price must be greater than 0"],
      default: 160,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    orderDate: {
      type: Date,
      required: true,
    },
    deliveryDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: Object.values(orderStatuses),
      default: orderStatuses.PENDING,
    },
    photos: [{ type: String }], // URLs (Cloudinary etc.)
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
