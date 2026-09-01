import mongoose from "mongoose";

/**
 * Connects to MongoDB using the URI provided in the environment.
 * Caches the connection across serverless invocations (important for Vercel),
 * and NEVER calls process.exit — that kills the whole serverless function
 * process and causes "Node.js process exited with exit status 1" errors
 * on every request.
 */
let cached = global._mongoose;

if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    // Throw instead of exiting the process — let Express's error handler
    // (or the caller) deal with it, so one bad request doesn't kill the
    // whole function instance.
    throw new Error(
      "MONGO_URI is not set in the environment. Check your Vercel Project Settings > Environment Variables."
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    mongoose.set("strictQuery", true);
    cached.promise = mongoose
      .connect(uri, {
        bufferCommands: false,
      })
      .then((mongooseInstance) => {
        console.log(
          `MongoDB connected: ${mongooseInstance.connection.host}/${mongooseInstance.connection.name}`
        );
        return mongooseInstance;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null; // reset so next request can retry
    console.error(`MongoDB connection error: ${error.message}`);
    throw error;
  }

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected");
  });

  mongoose.connection.on("error", (err) => {
    console.error(`MongoDB connection error: ${err.message}`);
  });

  return cached.conn;
};

export default connectDB;