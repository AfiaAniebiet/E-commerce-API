const User = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const registerUser = async (req, res, next) => {
  const { email } = req.body;
  const emailExists = await User.findOne({ email });

  if (emailExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

const loginUser = async (req, res, next) => {
  res.send("Login Route");
};

const logoutUser = async (req, res, next) => {
  res.send("Logout Route");
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
