import express from "express";
import {
  getOrders,
  getOrder,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orderController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.use(protect, authorize("admin"));

router.get("/", getOrders);
router.get("/:id", getOrder);
router.put("/:id/status", updateOrderStatus);
router.delete("/:id", deleteOrder);

export default router;
