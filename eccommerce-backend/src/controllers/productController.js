import Product from "../models/Product.js";
import { success, failure } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc    List products (paginated, searchable, filterable)
// @route   GET /api/products
// @access  Private (admin)
export const getProducts = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);
  const { search, category, stock, status, sort } = req.query;

  const filter = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { sku: { $regex: search, $options: "i" } },
      { brand: { $regex: search, $options: "i" } },
    ];
  }

  if (category && category !== "all") {
    filter.category = category;
  }

  if (status === "active") filter.isActive = true;
  if (status === "inactive") filter.isActive = false;

  if (stock === "in") filter.stock = { $gt: 0 };
  if (stock === "out") filter.stock = { $lte: 0 };
  if (stock === "low") filter.stock = { $gt: 0, $lte: 10 };

  let sortOption = { createdAt: -1 };
  if (sort === "price_asc") sortOption = { price: 1 };
  if (sort === "price_desc") sortOption = { price: -1 };
  if (sort === "name_asc") sortOption = { name: 1 };
  if (sort === "stock_asc") sortOption = { stock: 1 };

  const total = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .sort(sortOption)
    .skip((page - 1) * limit)
    .limit(limit);

  return success(res, 200, "Products fetched successfully", products, {
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    },
  });
});

// @desc    Get a single product
// @route   GET /api/products/:id
// @access  Private (admin)
export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return failure(res, 404, "Product not found");
  return success(res, 200, "Product fetched successfully", product);
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private (admin)
export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  return success(res, 201, "Product created successfully", product);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private (admin)
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) return failure(res, 404, "Product not found");
  return success(res, 200, "Product updated successfully", product);
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private (admin)
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return failure(res, 404, "Product not found");
  return success(res, 200, "Product deleted successfully");
});

// @desc    List distinct categories
// @route   GET /api/products/categories/list
// @access  Private (admin)
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Product.distinct("category");
  return success(res, 200, "Categories fetched successfully", categories);
});
