import dns from "node:dns";
dns.setServers(['1.1.1.1', '8.8.4.4']);

import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();

// --- Core middleware ---
// const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
//   .split(",")
//   .map((origin) => origin.trim());

app.use(
  cors(
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
)
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.get('/',(req, res)=>res.status(200).json({status:'successful'}))

// --- Health check ---
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "API is running" });
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

// const PORT = process.env.PORT || 4000;

const startServer = async () => {
  await connectDB();
  // app.listen(PORT, () => {
  //   console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
  // });
  if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
};

startServer();

export default app