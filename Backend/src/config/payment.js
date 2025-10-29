// ROLE: Centralized all payment service configurations
// What it does: Initializes all payment gateways so they're ready to use throughout the app.

const mpesa = require('mpesa-node'); // Import M-Pesa SDK for Node.js
const Flutterwave = require('flutterwave-node-v3'); // Import Flutterwave SDK for Node.js

// 🔐 M-Pesa Configuration using environment variables
const mpesaConfig = {
    consumerKey: process.env.MPESA_CONSUMER_KEY,       // API consumer key from Safaricom
    consumerSecret: process.env.MPESA_CONSUMER_SECRET, // API consumer secret from Safaricom
    environment: process.env.MPESA_ENVIRONMENT || "sandbox", // Use 'sandbox' for testing, 'production' for live
    shortCode: process.env.MPESA_SHORTCODE,            // Business short code registered with M-Pesa
    passKey: process.env.MPESA_PASSKEY,                // Passkey for STK Push authentication
    callbackUrl: `${process.env.SERVER_URL}/api/payments/mpesa/callback` // URL M-Pesa will notify after transaction
};

// 🌍 Flutterwave Configuration using environment variables
const flutterwaveConfig = {
    publicKey: process.env.FLW_PUBLIC_KEY,      // Public key for frontend or public API calls
    secretKey: process.env.FLW_SECRET_KEY,      // Secret key for secure backend operations
    encryptionKey: process.env.FLW_ENCRYPTION_KEY // Used for encrypting sensitive payloads
};

// 🚀 Initialize M-Pesa client with its config
const mpesaClient = new mpesa.Mpesa(mpesaConfig);

// 🚀 Initialize Flutterwave client with public and secret keys
const flwClient = new Flutterwave(
    flutterwaveConfig.publicKey,
    flutterwaveConfig.secretKey
);

// 📦 Export both clients and their configs for use across the app
module.exports = {
    mpesaClient,        // Ready-to-use M-Pesa client
    mpesaConfig,        // M-Pesa config object (useful for debugging or advanced flows)
    flwClient,          // Ready-to-use Flutterwave client
    flutterwaveConfig   // Flutterwave config object (for reference or advanced usage)
};