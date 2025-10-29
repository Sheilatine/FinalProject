// Import Express framework
const express = require('express');

// Create a new router instance
const router = express.Router();

// Import middleware for user input validation
const validateUser = require("../middleware/validation");

// Import middleware for route protection via JWT authentication
const auth = require("../middleware/auth");

// Import controller functions for user operations
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
} = require('../controllers/userController');


// Public routes (no authentication required)

// Route to log in a user and return a JWT token
router.post("/login", loginUser);

// Route to create a new user with validation middleware
router.post("/", validateUser, createUser);


// Protected routes (authentication required)

// Route to get all users (requires valid token)
router.get("/", auth, getUsers);

// Route to get a single user by ID (requires valid token)
router.get("/:id", auth, getUserById);

// Route to update a user by ID (requires valid token)
router.put("/:id", auth, updateUser);

// Route to delete a user by ID (requires valid token)
router.delete("/:id", auth, deleteUser);


// Export the router to be used in the main app
module.exports = router;