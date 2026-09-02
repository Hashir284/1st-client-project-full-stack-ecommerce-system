import dns from "node:dns";
dns.setServers(['1.1.1.1', '8.8.8.8']);
import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import { notFound, errorHandler } from "./src/middleware/errorHandler.js";

import authRoutes from "./src/routes/authRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";

const app = express();

// --- Favicon handling ---
app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use(cors());


// --- Core middleware ---
// const allowedOrigins = (process?.env?.CLIENT_URL || "http://localhost:5173")
//   .split(",")
//   .map((origin) => origin.trim());

  //   {
  //   origin: (origin, callback) => {
  //     if (!origin || allowedOrigins.includes(origin)) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error("Not allowed by CORS"));
  //     }
  //   },
  //   credentials: true,
  // }
  
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(async (req, res, next) => {
    try {
      console.log("Connecting to MongoDB...");
      await connectDB();
      next();
    } catch (error) {
      next(error);
    }
  });

// --- Health check ---
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "API is running" });
});
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Welcome to the API" });
});

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);

// --- Error handling ---
app.use(notFound);
app.use(errorHandler);

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running in development mode on port ${PORT}`);
  });
}

export default app;