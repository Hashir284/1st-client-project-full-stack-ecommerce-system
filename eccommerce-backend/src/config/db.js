import mongoose from "mongoose";

const connectDB = async () => {
  // Connection caching for Serverless performance
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const uri = process?.env?.MONGO_URI;

  if (!uri) {
    console.error("MONGO_URI is not set in the environment.");
    throw new Error("MONGO_URI is missing");
  }

  try {
    mongoose.set("strictQuery", true);
    
    // REMOVED bufferCommands: false to allow Mongoose to queue queries during connection
    const conn = await mongoose.connect(uri);
    
    console.log(`MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    throw error;
  }
};

export default connectDB;