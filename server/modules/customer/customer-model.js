import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firmName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
      trim: true,
      index: true,
      sparse: true,
    },
    ownerName: {
      type: String,
      optional: true,
      trim: true,
    },
    phoneNo: {
      type: String,
      optional: true,
      trim: true,
      min: 10,
      max: 10,
    },
    contactPerson: {
      type: String,
      optional: true,
      trim: true,
    },
    gstNo: String,
    addressDetails: {
      address: { type: String, required: true, trim: true },
      lat: { type: Number },
      lng: { type: Number },
      address1: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      zip_code: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);
