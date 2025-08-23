import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const accountRoleEnums = ["admin", "staff"];
const defaultRole = "staff";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 30,
      trim: true,
      index: true,
      sparse: true,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 30,
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
        validator: function (value) {
          return validator.isEmail(value);
        },
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

// Pre-save hook to hash password before saving
userSchema.pre("save", async function (next) {
  // Below "this" refers to the mongo doc whic is being created/changed
  if (!this.isModified("password")) return next(); // only hash if password is new/changed
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  const isPasswordCorrect = await bcrypt.compare(
    candidatePassword,
    this.password
  );
  return isPasswordCorrect;
};

export default mongoose.model("User", userSchema);
