const { validateEmail } = require("../utils/validators");
const User = require("../models/userModel");

// Register new user
const registerUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, dob, petCategory } = req.body;

    // Validate required fields
    if (!name || !email || !phoneNumber || !dob || !petCategory) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate phone number format (basic validation)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res
        .status(400)
        .json({
          message: "Invalid phone number format. Please provide 10 digits",
        });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: email }, { phoneNumber: phoneNumber }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email or phone number",
      });
    }

    // Create user object
    const user = new User({
      name,
      email,
      phoneNumber,
      dob: new Date(dob),
      petCategory,
      profilePic: req.file ? `/uploads/images/${req.file.filename}` : undefined,
    });

    // Save user
    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        petCategory: user.petCategory,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user by phone number
const getUserByPhone = async (req, res) => {
  try {
    const { phoneNumber } = req.params;

    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        dob: user.dob,
        petCategory: user.petCategory,
        profilePic: user.profilePic,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-__v");
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single user
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updates = req.body;
    if (updates.email && !validateEmail(updates.email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    Object.keys(updates).forEach((key) => {
      user[key] = updates[key];
    });

    if (req.file) {
      user.profilePic = `/uploads/images/${req.file.filename}`;
    }

    await user.save();
    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  getUserByPhone,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
