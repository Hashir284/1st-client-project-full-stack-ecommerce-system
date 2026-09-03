import mongoose from "mongoose";

/**
 * Connects to MongoDB using the URI provided in the environment.
 * Exits the process if the connection cannot be established, since
 * the API is useless without a database.
 */
const connectDB = async () => {
  // Connection caching for Serverless performance
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const uri = process?.env?.MONGO_URI;
  console.log("URI Received:", JSON.stringify(uri));

  if (!uri) {
    console.error("MONGO_URI is not set in the environment. Check your .env file.");
    process.exit(1);
  }

  try {
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(uri, {
      bufferCommands: false,
    });
    console.log(`MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    // Serverless crash fix: process.exit(1) ki jaga error throw karein
    throw error;
  }

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected");
  });

  mongoose.connection.on("error", (err) => {
    console.error(`MongoDB connection error: ${err.message}`);
  });
};

export default connectDB;