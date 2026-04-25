const User = require("../models/User");

exports.registerUser = async (req, res) => {
  try {
    console.log("Register request body:", req.body); // debug
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = new User({ name, email, password });
    const saved = await user.save();

    // ✅ return JSON response
    return res.status(201).json({
      _id: saved._id,
      name: saved.name,
      email: saved.email,
      createdAt: saved.createdAt
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(400).json({ message: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // ✅ Always return 200 on success
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

