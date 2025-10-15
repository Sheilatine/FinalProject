// Import mongoose instance from the custom database configuration
const { mongoose } = require('../config/db'); // importing mongoose from db.js file

// Extract Schema constructor from mongoose
const { Schema } = mongoose; // importing schema from mongoose

// Import bcrypt for password hashing
const bcrypt = require('bcryptjs');


// Define the user schema (rules for creating documents in the 'users' collection)
const userSchema = new Schema({
    // Basic user identity fields
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },

    // Nested profile object for personal details
    profile: {
        firstName: String,
        lastName: String,
        avatar: String,
        phoneNumber: String
    },

    // Nested university object for academic details
    university: {
        name: { type: String, required: true },
        domain: { type: String, required: true },
        campus: { type: String, required: true },
        studentId: { type: String, required: true },
        type: { type: String, required: true }
    },

    // Verification status and metadata
    verification: {
        isVerified: { type: Boolean, default: false },
        verificationMethod: String,
        verifiedAt: Date
    },

    // Location details including coordinates
    location: {
        country: String,
        city: String,
        coordinates: {
            latitude: Number,
            longitude: Number
        }
    },

    // User preferences for language and notifications
    preferences: {
        language: { type: String, default: "en" },
        notifications: { type: Boolean, default: true }
    },

    // User role for access control
    role: { type: String, default: "user" }

}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields


// Pre-save hook: hashes password before saving to the database
userSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified or is new
    if (!this.isModified('password')) return next();

    // Hash the password with a salt round of 10
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


// Create a model from the schema (represents the 'users' collection in MongoDB)
const User = mongoose.model("User", userSchema);

// Export the model for use in other parts of the application
module.exports = User;