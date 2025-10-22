// Import the mongoose library for MongoDB object modeling
const mongoose = require('mongoose');

// Load environment variables from a .env file into process.env
require('dotenv').config();

// Define an asynchronous function to connect to MongoDB
const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB using the URI from environment variables
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,        // Use the new URL parser (recommended)
            useUnifiedTopology: true,     // Use the new server discovery and monitoring engine
        });

        // Log success message if connection is established
        console.log("MongoDB Connected.....");
    } catch (error) {
        // Log error message if connection fails
        console.error(error.message);

        // Exit the process with failure code
        process.exit(1);
    }
};

// Export the connectDB function and mongoose instance for use in other files
module.exports = { connectDB, mongoose };