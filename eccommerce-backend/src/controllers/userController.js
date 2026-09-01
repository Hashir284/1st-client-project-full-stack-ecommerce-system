import User from "../models/User.js";
import { success, failure } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc    List users (paginated, searchable, filterable)
// @route   GET /api/users
// @access  Private (admin)
export const getUsers = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);
  const { search, role, status } = req.query;

  const filter = {};
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }
  if (role && role !== "all") filter.role = role;
  if (status === "active") filter.isActive = true;
  if (status === "inactive") filter.isActive = false;

  const total = await User.countDocuments(filter);
  const users = await User.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return success(res, 200, "Users fetched successfully", users, {
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    },
  });
});

// @desc    Get a single user
// @route   GET /api/users/:id
// @access  Private (admin)
export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return failure(res, 404, "User not found");
  return success(res, 200, "User fetched successfully", user);
});

// @desc    Update a user (role, status, basic info)
// @route   PUT /api/users/:id
// @access  Private (admin)
export const updateUser = asyncHandler(async (req, res) => {
  const { name, email, role, isActive, avatar, phone } = req.body;

  const user = await User.findById(req.params.id);
  if (!user) return failure(res, 404, "User not found");

  if (name !== undefined) user.name = name;
  if (email !== undefined) user.email = email;
  if (role !== undefined) user.role = role;
  if (isActive !== undefined) user.isActive = isActive;
  if (avatar !== undefined) user.avatar = avatar;
  if (phone !== undefined) user.phone = phone;

  await user.save();

  return success(res, 200, "User updated successfully", user);
});

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private (admin)
export const deleteUser = asyncHandler(async (req, res) => {
  if (req.params.id === String(req.user._id)) {
    return failure(res, 400, "You cannot delete your own account");
  }

  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return failure(res, 404, "User not found");
  return success(res, 200, "User deleted successfully");
});
