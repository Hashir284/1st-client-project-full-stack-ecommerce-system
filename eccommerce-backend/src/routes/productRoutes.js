import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
} from "../controllers/productController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// --- PUBLIC ROUTES (For Ecommerce Storefront) ---
router.get("/categories/list", getCategories);
router.get("/", getProducts);
router.get("/:id", getProduct);

// --- PROTECTED ADMIN ROUTES (For Admin Panel) ---
router.post("/", protect, authorize("admin"), createProduct);
router.put("/:id", protect, authorize("admin"), updateProduct);
router.delete("/:id", protect, authorize("admin"), deleteProduct);

export default router;