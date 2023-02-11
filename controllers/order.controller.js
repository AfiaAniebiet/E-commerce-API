const Order = require("../models/order.model");
const Product = require("../models/product.model");
const { StatusCodes } = require("http-status-codes");
const CustomErrors = require("../errors");
const { checkPermissions } = require("../utils");

// Fake stripe functionality
const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = "someRandomValue";
  return { client_secret, amount };
};

const getAllOrders = async (req, res, next) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

const getSingleOrder = async (req, res, next) => {
  const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new CustomErrors.NotFoundError("Order does not exist.");
  }
  checkPermissions(req.user, order.user);
  res.status(StatusCodes.OK).json({ order });
};

const getCurrentUserOrders = async (req, res, next) => {
  const orders = await Order.find({ user: req.user.userId });
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

const createOrder = async (req, res, next) => {
  const { items: cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new CustomErrors.BadRequestError("Cart is empty.");
  }
  if (!tax || !shippingFee) {
    throw new CustomErrors.BadRequestError("Tax and Shipping Fees not found.");
  }

  let orderItems = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      throw new CustomErrors.NotFoundError("Product does not exist.");
    }
    const { name, price, image, _id } = dbProduct;
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    };
    // Add item to order
    orderItems = [...orderItems, singleOrderItem];
    // Calculate subtotal
    subtotal += item.amount * price;
  }
  //   Calculate total
  const total = tax + shippingFee + subtotal;
  //   Get client secret
  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: "usd",
  });

  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clietSecret: paymentIntent.client_secret,
    user: req.user.userId,
  });
  res.status(StatusCodes.CREATED).json({ order, clientSecret: order.client_secret });
};

const updateOrder = async (req, res, next) => {
  const { id: orderId } = req.params;
  const { paymentIntentId } = req.body;

  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new CustomErrors.NotFoundError("Order does not exist.");
  }
  checkPermissions(req.user, order.user);

  order.paymentIntentId = paymentIntentId;
  order.status = "Paid";

  res.status(StatusCodes.OK).json({ order });
};

module.exports = {
  getAllOrders,
  getCurrentUserOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
};
