const express = require("express");
const router = express.Router();
const { getProducts, addProduct } = require("../controllers/productController");

// GET /api/products
router.get("/", getProducts);

// POST /api/products
router.post("/", addProduct);

module.exports = router;

