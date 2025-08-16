import mongoose from "mongoose";

const connectDB = (url) => {
  mongoose.set("strictQuery", false);

//   { useNewUrlParser: true, useUnifiedTopology: true }
  mongoose
    .connect(url)
    .then(() => console.log("⚡⚡ MongoDB Connected ⚡⚡"))
    .catch((err) => console.log(err));
};

export default connectDB;
