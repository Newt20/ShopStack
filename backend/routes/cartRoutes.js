const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// Add item to cart
router.post("/add", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid userId" });
  }

  let cart = await Cart.findOne({ userId });
  if (!cart) cart = new Cart({ userId, items: [] });

  const itemIndex = cart.items.findIndex(i => i.productId.toString() === productId);
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await cart.save();
  res.json(cart);
});

// Get cart
const mongoose = require("mongoose");

router.get("/:userId", async (req, res) => {
  console.log("GET /cart/:userId param:", req.params.userId);
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid userId" });
  }

  const cart = await Cart.findOne({ userId });
  res.json(cart || { items: [] });
});


module.exports = router;

