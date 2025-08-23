import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.set("strictQuery", false);

  await mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("⚡⚡ MongoDB Connected ⚡⚡"))
    .catch((err) => console.log(err));
};

export default connectDB;
