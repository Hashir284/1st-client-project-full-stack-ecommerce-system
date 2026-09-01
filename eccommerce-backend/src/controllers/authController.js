import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { success, failure } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc    Login admin/user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return failure(res, 400, "Email and password are required");
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

  if (!user) {
    return failure(res, 401, "Invalid email or password");
  }

  if (!user.isActive) {
    return failure(res, 403, "This account has been deactivated");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return failure(res, 401, "Invalid email or password");
  }

  if (user.role !== "admin") {
    return failure(res, 403, "Only admin accounts can access this dashboard");
  }

  const token = generateToken(user._id);

  return success(res, 200, "Login successful", {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    },
  });
});

// @desc    Get currently logged-in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  return success(res, 200, "Current user fetched", req.user);
});

// @desc    Logout (stateless JWT - client discards the token)
// @route   POST /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res) => {
  return success(res, 200, "Logged out successfully");
});

// @desc    Update own profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = asyncHandler(async (req, res) => {
  const { name, avatar, phone } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) return failure(res, 404, "User not found");

  if (name !== undefined) user.name = name;
  if (avatar !== undefined) user.avatar = avatar;
  if (phone !== undefined) user.phone = phone;

  await user.save();

  return success(res, 200, "Profile updated successfully", user);
});

// @desc    Change own password
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return failure(res, 400, "Current and new password are required");
  }
  if (newPassword.length < 6) {
    return failure(res, 400, "New password must be at least 6 characters");
  }

  const user = await User.findById(req.user._id).select("+password");
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    return failure(res, 401, "Current password is incorrect");
  }

  user.password = newPassword;
  await user.save();

  return success(res, 200, "Password changed successfully");
});
