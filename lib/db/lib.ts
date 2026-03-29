import mongoose from "mongoose";

export const connectdb = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected");
      return;
    }

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGO_URI not defined");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("DB Connected");
  } catch (error) {
    console.log("DB Error", error);
  }
};