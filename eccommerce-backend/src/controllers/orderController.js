import Order from "../models/Order.js";
import User from "../models/User.js";
import { success, failure } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const VALID_ORDER_STATUSES = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

// @desc    Create new order (Checkout)
// @route   POST /api/orders
// @access  Private (Logged-in User/Admin)
export const createOrder = asyncHandler(async (req, res) => {
  const {
    items,
    shippingAddress,
    paymentMethod,
    subtotal,
    discount,
    shipping,
    total,
  } = req.body;

  if (!items || items.length === 0) {
    return failure(res, 400, "No order items provided");
  }

  if (!shippingAddress) {
    return failure(res, 400, "Shipping address is required");
  }

  const order = await Order.create({
    user: req.user._id,
    items,
    shippingAddress,
    paymentMethod,
    subtotal,
    discount,
    shipping,
    total,
  });

  return success(res, 201, "Order placed successfully", order);
});

// @desc    Get logged-in user's order history
// @route   GET /api/orders/my-orders
// @access  Private (Logged-in User/Admin)
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  return success(res, 200, "User orders fetched successfully", orders);
});

// @desc    List orders (paginated, searchable, filterable)
// @route   GET /api/orders
// @access  Private (admin)
export const getOrders = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);
  const { search, orderStatus, paymentStatus } = req.query;

  const filter = {};
  if (orderStatus && orderStatus !== "all") filter.orderStatus = orderStatus;
  if (paymentStatus && paymentStatus !== "all") filter.paymentStatus = paymentStatus;

  let query = Order.find(filter).populate("user", "name email");

  if (search) {
    const orConditions = [];
    if (search.match(/^[0-9a-fA-F]{24}$/)) {
      orConditions.push({ _id: search });
    }
    const matchingUsers = await User
      .find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      })
      .select("_id");
    if (matchingUsers.length) {
      orConditions.push({ user: { $in: matchingUsers.map((u) => u._id) } });
    }
    if (orConditions.length) {
      filter.$or = orConditions;
      query = Order.find(filter).populate("user", "name email");
    } else if (!search.match(/^[0-9a-fA-F]{24}$/)) {
      filter._id = null;
      query = Order.find(filter).populate("user", "name email");
    }
  }

  const total = await Order.countDocuments(filter);
  const orders = await query
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return success(res, 200, "Orders fetched successfully", orders, {
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    },
  });
});

// @desc    Get a single order with full details
// @route   GET /api/orders/:id
// @access  Private
export const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email phone")
    .populate("items.product", "name images");

  if (!order) return failure(res, 404, "Order not found");

  // Allow if user is admin OR order belongs to the user
  if (req.user.role !== "admin" && String(order.user._id) !== String(req.user._id)) {
    return failure(res, 403, "Not authorized to view this order");
  }

  return success(res, 200, "Order fetched successfully", order);
});

// @desc    Update order status (and optionally payment status)
// @route   PUT /api/orders/:id/status
// @access  Private (admin)
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderStatus, paymentStatus } = req.body;

  if (orderStatus && !VALID_ORDER_STATUSES.includes(orderStatus)) {
    return failure(res, 400, "Invalid order status");
  }

  const order = await Order.findById(req.params.id);
  if (!order) return failure(res, 404, "Order not found");

  if (orderStatus) order.orderStatus = orderStatus;
  if (paymentStatus) order.paymentStatus = paymentStatus;

  await order.save();

  return success(res, 200, "Order status updated successfully", order);
});

// @desc    Delete/cancel an order
// @route   DELETE /api/orders/:id
// @access  Private (admin)
export const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) return failure(res, 404, "Order not found");
  return success(res, 200, "Order deleted successfully");
});