import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrders,
  getOrder,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orderController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// --- LOGGED-IN CUSTOMER & ADMIN ROUTES ---
router.post("/", protect, createOrder); // Place order
router.get("/my-orders", protect, getMyOrders); // Get user's own orders
router.get("/:id", protect, getOrder); // View order details (Admin or Order owner)

// --- ADMIN-ONLY ROUTES ---
router.get("/", protect, authorize("admin"), getOrders); // View all orders
router.put("/:id/status", protect, authorize("admin"), updateOrderStatus); // Update status
router.delete("/:id", protect, authorize("admin"), deleteOrder); // Delete order

export default router;