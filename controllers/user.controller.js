const User = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

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
  res.send("Show Current User");
};

const updateUser = async (req, res, next) => {
  res.send("Update User Details");
};

const updateUserPassword = async (req, res, next) => {
  res.send("Update User Password");
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
