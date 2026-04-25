// backend/models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      price: Number
    }
  ],
  total: { type: Number, required: true },
  status: { type: String, default: "Pending" }, // Pending, Shipped, Delivered
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);

