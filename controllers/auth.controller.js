const User = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const jwt = require("jsonwebtoken");
const { attachCookiesToResponse, createTokenUser } = require("../utils/index");

// Register new user
const registerUser = async (req, res, next) => {
  const { email, fullName, password } = req.body;
  const emailExists = await User.findOne({ email });

  if (emailExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  //   First registered account is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ email, fullName, password, role });
  const tokenUser = createTokenUser(user);

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

// Login user functinality
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError("Provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError("User does not exist.");
  }

  const isPassword = await user.comparePassword(password);
  if (!isPassword) {
    throw new CustomError.UnauthenticatedError("User does not exist.");
  }

  const tokenUser = createTokenUser(user);

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

// Logout signed in user
const logoutUser = async (req, res, next) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "You have successfully logged out." });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
