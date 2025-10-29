// Custom error-handling middleware function
function errorHandler(err, req, res, next) {
    // Log the full error stack trace to the console for debugging
    console.log(err.stack);

    // Send a JSON response with the error message and appropriate status code
    res.status(err.statusCode || 500).json({
        // Use the error's message if available, otherwise default to a generic message
        message: err.message || "Internal Server Error",
    });
}

// Export the middleware to be used in the Express app
module.exports = errorHandler;