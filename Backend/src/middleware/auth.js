// Import the jsonwebtoken library for verifying JWT tokens
const jwt = require("jsonwebtoken");

// Authentication middleware to protect routes
const auth = (req, res, next) => {
  // Extract token from the Authorization header (format: "Bearer <token>")
  const token = req.header("Authorization")?.split(" ")[1];

  // If no token is provided, deny access
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    // Verify the token using the secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user info to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If token verification fails, respond with an error
    res.status(400).json({ message: "Invalid token" });
  }
};

// Export the middleware function for use in route protection
module.exports = auth;