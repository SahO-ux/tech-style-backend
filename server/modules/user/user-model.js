import mongoose from "mongoose";

const accountRoleEnums = ["admin", "staff"];
const defaultRole = "staff";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
      trim: true,
      index: true,
      default: null,
      sparse: true,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
      trim: true,
      default: null,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: (props) => `${props.value} is not a valid email address`,
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      validate: {
        validator: function (value) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(
            value
          );
        },
        message:
          "Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character.",
      },
    },
    role: { type: String, enum: accountRoleEnums, default: defaultRole },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
