// Import Mongoose for MongoDB modeling
const mongoose = require('mongoose');

// Import bcrypt for password hashing and comparison
const bcrypt = require('bcryptjs');

// Define the User schema with fields and validation
const userSchema = new mongoose.Schema({
  // 📧 Email field with validation and formatting
  email: {
    type: String,
    required: [true, 'Email is required'], // Must be provided
    unique: true,                          // No duplicate emails allowed
    lowercase: true,                       // Normalize email to lowercase
    trim: true                             // Remove whitespace
  },

  // 🔒 Password field with security settings
  password: {
    type: String,
    required: [true, 'Password is required'], // Must be provided
    minlength: 6,                             // Minimum length
    select: false                             // Exclude from query results by default
  },

  // 👥 Role field to define user type
  role: {
    type: String,
    enum: ['student', 'business', 'faculty'], // Allowed roles
    required: true                            // Must be specified
  },

  // 🧾 Profile object with personal and role-specific details
  profile: {
    firstName: String,
    lastName: String,
    phone: String,
    avatar: String,   // URL to profile image
    bio: String,

    // 🎓 Student-specific fields
    studentId: String,
    university: String,
    yearOfStudy: Number,
    skills: [String], // Array of skill tags

    // 🏢 Business-specific fields
    businessName: String,
    businessType: String
  },

  // 💰 Wallet object to track user balance
  wallet: {
    balance: { type: Number, default: 0 },     // Default balance is 0
    currency: { type: String, default: 'KES' } // Default currency is Kenyan Shillings
  },

  // ⭐ Ratings object to track user feedback
  ratings: {
    average: { type: Number, default: 0 }, // Average rating score
    count: { type: Number, default: 0 }    // Number of ratings received
  },

  // ✅ Verification status for email and phone
  verification: {
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false }
  },

  // 🟢 Active status to enable/disable user account
  isActive: { type: Boolean, default: true }
}, {
  // 🕒 Automatically adds createdAt and updatedAt timestamps
  timestamps: true
});


// 🔐 Middleware to hash password before saving to DB
userSchema.pre('save', async function(next) {
  // Only hash if password was modified or newly set
  if (!this.isModified('password')) return next();

  // Hash the password with cost factor 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});


// 🔍 Method to compare entered password with hashed password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};


// 🧠 Virtual field to get full name from first and last name
userSchema.virtual("fullName").get(function() {
  return `${this.profile.firstName} ${this.profile.lastName}`;
});


// 📦 Export the User model for use in controllers and services
module.exports = mongoose.model('User', userSchema);