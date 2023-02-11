const mongoose = require("mongoose");

const SingleOrderItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
});

const OrderSchema = new mongoose.Schema(
  {
    tax: {
      type: Number,
      required: true,
      default: 0,
    },
    shippingFee: {
      type: Number,
      default: 0,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    orderItems: {
      type: [SingleOrderItemSchema],
    },
    status: {
      type: String,
      enum: ["Pending", "Failed", "Paid", "Delivered", "Cancelled"],
      default: "Pending",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    clietSecret: {
      type: String,
    },
    paymentId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
