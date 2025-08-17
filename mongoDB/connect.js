import mongoose from "mongoose";

const connectDB = async (url) => {
  mongoose.set("strictQuery", false);

  await mongoose
    .connect(url)
    .then(() => console.log("⚡⚡ MongoDB Connected ⚡⚡"))
    .catch((err) => console.log(err));
};

export default connectDB;
