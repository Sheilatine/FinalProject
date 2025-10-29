// ROLE: Configures WebSocket settings for real-time features
// What it does: Sets up Socket.io with proper CORS and connection settings.

// Import the Socket.IO library to enable real-time communication
const socketIO = require('socket.io');

// Define a function that sets up and configures Socket.IO on the provided server
const configureSocket = (server) => {
    // Initialize Socket.IO with custom options
    const io = socketIO(server, {
        // CORS settings to allow frontend access
        cors: {
            origin: process.env.CLIENT_URL || "http://localhost:3000", // Allow requests from this origin
            methods: ['GET', 'POST'], // Allow these HTTP methods
            credentials: true // Allow cookies and authentication headers
        },

        // Connection timeout settings
        pingTimeOut: 6000,   // If no ping response within 6 seconds, disconnect the client
        pingInterval: 25000  // Send a ping every 25 seconds to check if the client is still connected
    });

    // Return the configured Socket.IO instance for use in other parts of the app
    return io;
};

// Export the configuration function so it can be used in your server setup
module.exports = configureSocket;