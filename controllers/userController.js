// Import the User model
const User = require('../Models/User');

// Import validation result handler from express-validator
const { validationResult } = require("express-validator");

// Import JWT for token generation
const jwt = require("jsonwebtoken");

// Import bcrypt for password hashing and comparison
const bcrypt = require("bcryptjs");


// LOGIN: Validate a user and return a JWT token
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists by email
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  // Compare provided password with stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  // Generate JWT token with user ID and role
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d", // Token expires in 1 day
  });

  // Send token as response
  res.json({ token });
};


// GET: Retrieve all users (excluding passwords)
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password field
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET: Retrieve a single user by ID (excluding password)
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// POST: Create a new user
const createUser = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructure user fields from request body
  const {
    name,
    email,
    password,
    profile,
    university,
    verification,
    location,
    preferences,
    role
  } = req.body;

  try {
    // Create new User instance
    const user = new User({
      name,
      email,
      password,
      profile,
      university,
      verification,
      location,
      preferences,
      role
    });

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // Save user to database
    const savedUser = await user.save();

    // Remove password before sending response
    const userWithoutPassword = savedUser.toObject();
    delete userWithoutPassword.password;

    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// PUT: Update user by ID
const updateUser = async (req, res) => {
  try {
    // Find user by ID
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Merge request body into user object
    Object.assign(user, req.body);

    // Save updated user
    const updatedUser = await user.save();

    // Remove password before sending response
    const userWithoutPassword = updatedUser.toObject();
    delete userWithoutPassword.password;

    res.json(userWithoutPassword);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// DELETE: Remove user by ID
const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Export all controller functions
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
};