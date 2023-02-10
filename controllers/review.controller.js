const Review = require("../models/review.model");
const Product = require("../models/product.model");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");

const createReview = async (req, res, next) => {
  const { product: productId } = req.body;

  //   Checks for availability of the product
  const isProductAvailable = await Product.findOne({ _id: productId });
  if (!isProductAvailable) {
    throw new CustomError.NotFoundError(`The product with id: ${productId} is not available.`);
  }

  // Check if review already exists
  const reviewExists = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });
  if (reviewExists) {
    throw new CustomError.BadRequestError("You have submitted a review before.");
  }

  req.body.user = req.user.userId;
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
};

const getAllReviews = async (req, res, next) => {
  const reviews = await Review.find({})
    .populate({
      path: "product",
      select: "productName company price",
    })
    .populate({
      path: "user",
      select: "fullName",
    });

  res.status(StatusCodes.OK).json({ reviews });
};

const getSingleReview = async (req, res, next) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new CustomError.NotFoundError("This review does not exist.");
  }

  res.status(StatusCodes.OK).json({ review });
};

const updateReview = async (req, res, next) => {
  //  Get `id` from req.params
  const { id: reviewId } = req.params;
  const { rating, title, comment } = req.body;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new CustomError.NotFoundError("This review does not exist.");
  }
  checkPermissions(req.user, review.user);

  review.rating = rating;
  review.title = title;
  review.comment = comment;

  await review.save();

  res.send(StatusCodes.OK).json({ review });
};

const deleteReview = async (req, res, next) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new CustomError.NotFoundError("This review does not exist");
  }

  checkPermissions(req.user, review.user);

  await review.remove();

  res.send(StatusCodes.OK).json({ msg: "Review successfully deleted" });
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
