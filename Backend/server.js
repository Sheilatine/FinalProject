// // Import Express framework
// const express = require('express');

// // Import dotenv to load environment variables from .env file
// const dotenv = require('dotenv');

// // Import custom database connection function
// const { connectDB } = require('./config/db');

// // Import custom error-handling middleware
// const errorHandler = require('./middleware/errorHandler');


// // Load environment variables into process.env
// dotenv.config();

// // Initialize Express application
// const app = express();

// // Middleware: parse incoming JSON requests
// app.use(express.json());

// // Connect to MongoDB database
// connectDB();

// // Mount user-related routes under /users path
// app.use("/users", require("./routes/userRoutes"));

// // Global error-handling middleware (should be after all routes)
// app.use(errorHandler);

// // Default route for home page
// app.get("/", (req, res) => {
//     res.send("API Server for Express JS is up and running....");
// });

// // Define port from environment or fallback to 5000
// const PORT = process.env.PORT || 5000;

// // Start the server and listen on the defined port
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));