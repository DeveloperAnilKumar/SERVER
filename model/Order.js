const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: { type: [Schema.Types.Mixed], required: true },
  totalAmount: { type: Number, required: true },
  totalItems: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  paymentMethod: { type: String, required: true, enum: ["cash", "online"] },

  deliveryStatus: {
    type: String,
    required: true,
    enum: ["orderConform", "shipped", "outOfDelivery", "delivered"],
    default: "orderConform",
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending",
  },
  status: {
    type: String,
    enum: ["pending", "success"],
    default: "pending",
  },

  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },

  orderDate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
