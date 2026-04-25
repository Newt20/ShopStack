const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const Cart = require("./models/Cart");
const Order = require("./models/Order");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    // Clear old data
    await Product.deleteMany({});
    await User.deleteMany({});
    await Cart.deleteMany({});
    await Order.deleteMany({});

    // Insert sample products
    const products = await Product.insertMany([
      { name: "Laptop", price: 1200, description: "High performance laptop", image: "laptop.jpg", stock: 10, category: "Electronics" },
      { name: "Phone", price: 800, description: "Latest smartphone", image: "phone.jpg", stock: 20, category: "Electronics" },
      { name: "Headphones", price: 150, description: "Noise cancelling headphones", image: "headphones.jpg", stock: 30, category: "Accessories" }
    ]);

    // Insert sample user
    const user = await User.create({
      name: "Alice",
      email: "alice@example.com",
      password: "hashedpassword123"
    });

    // Create a cart for Alice
    await Cart.create({
      userId: user._id,
      items: [
        { productId: products[0]._id, quantity: 1 },
        { productId: products[1]._id, quantity: 2 }
      ]
    });

    // Create an order for Alice
    await Order.create({
      userId: user._id,
      items: [
        { productId: products[0]._id, quantity: 1, price: products[0].price },
        { productId: products[1]._id, quantity: 2, price: products[1].price }
      ],
      total: products[0].price * 1 + products[1].price * 2,
      status: "Pending"
    });

    console.log("Database seeded successfully");
    process.exit();
  })
  .catch(err => console.error(err));

