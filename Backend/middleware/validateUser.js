// Import the 'body' function from express-validator to define validation rules
const { body } = require("express-validator");

// Define an array of validation rules for user input
const validateUser = [
  // Ensure 'name' field is not empty
  body("name").notEmpty().withMessage("Name is required"),

  // Ensure 'email' field contains a valid email format
  body("email").isEmail().withMessage("Valid email is required"),

  // Ensure 'password' field has a minimum length of 6 characters
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

// Export the validation middleware for use in route definitions
module.exports = validateUser;