// backend/models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String }, // URL or filename
  stock: { type: Number, default: 0 },
  category: { type: String }
});

module.exports = mongoose.model("Product", productSchema);

