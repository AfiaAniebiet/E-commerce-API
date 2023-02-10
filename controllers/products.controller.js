const path = require("path");
const Product = require("../models/product.model");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createProduct = async (req, res, next) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res, next) => {
  const products = await Product.find({}).populate({
    path: "user",
    select: "fullName role",
  });

  res.status(StatusCodes.OK).json({ products, count: products.length });
};

const getSingleProduct = async (req, res, next) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId }).populate("reviews");
  if (!product) {
    throw new CustomError.NotFoundError("Product does not exist");
  }
  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res, next) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, { new: true, runValidators: true });
  if (!product) {
    throw new CustomError.NotFoundError(`Product with id: ${productId} does not exist`);
  }
  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res, next) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new CustomError.NotFoundError(`Product with id: ${productId} does not exist`);
  }

  await product.remove();

  res.status(StatusCodes.OK).json({ msg: "You have successfully deleted the Product" });
};

const uploadImage = async (req, res, next) => {
  if (!req.files) {
    throw new CustomError.BadRequestError("File was not uploaded");
  }

  const productImage = req.files.uploadImage;

  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please upload image file");
  }

  const maxSize = 1024 * 1024;

  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError("Image should be less than 1MB");
  }

  const imagePath = path.join(__dirname, "..", "/public/uploads/" + `${productImage.name}`);
  await productImage.mv(imagePath);
  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
