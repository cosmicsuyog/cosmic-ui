import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.info("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
};
