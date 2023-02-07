const User = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { createTokenUser, attachCookiesToResponse } = require("../utils");

const getAllUsers = async (req, res, next) => {
  const users = await User.find({ role: "user" }).select("-password");

  res.status(StatusCodes.OK).json({ users, count: users.length });
};

const getSingleUser = async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new CustomError.NotFoundError(`User with id: ${req.params.id} does not exist.`);
  }
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res, next) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

// Update user middleware
const updateUser = async (req, res, next) => {
  const { email, fullName } = req.body;
  if (!email || !fullName) {
    throw new CustomError.BadRequestError("Provide the necessary values");
  }
  const user = await User.findByIdAndUpdate(
    { _id: req.user.userId },
    { email, fullName },
    { new: true, runValidators }
  );
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const updateUserPassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("Provide the old and new passwords");
  }
  const user = await User.findOne({ _id: req.user.userId });

  const isPassword = await user.comparePassword(oldPassword);
  if (!isPassword) {
    throw new CustomError.UnauthenticatedError("You entered an invalid password");
  }

  user.password = newPassword;

  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Password changed successfully" });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
