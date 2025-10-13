// seed.js
// ======================================
// Purpose: Populate MongoDB with sample
// user data matching the userSchema structure.
// ======================================

// Import MongoDB connection and mongoose
const { connectDB, mongoose } = require('./db');

// Import User model
const User = require('./Models/User');

async function main() {
    // 1️⃣ Connect to the database
    await connectDB();

    // 2️⃣ Clear existing data in the User collection
    await User.deleteMany({});

    // 3️⃣ Insert sample user data
    await User.create([
        {
            name: "Rose Wambui",
            email: "alice@example.com",
            password: "Rose@25", // will be auto-hashed by pre-save hook
            profile: {
                firstName: "Rose",
                lastName: "Wambui",
                avatar: "https://example.com/avatars/rose.png",
                phoneNumber: "254797563426"
            },
            university: {
                name: "University of Nairobi",
                domain: "uonbi.ac.ke",
                campus: "Main Campus",
                studentId: "UON12345",
                type: "Public"
            },
            verification: {
                isVerified: true,
                verificationMethod: "email",
                verifiedAt: new Date()
            },
            location: {
                country: "Kenya",
                city: "Nairobi",
                coordinates: {
                    latitude: -1.2921,
                    longitude: 36.8219
                }
            },
            preferences: {
                language: "en",
                notifications: true
            },
            role: "admin"
        },
        {
            name: "Dedan Okware",
            email: "dedan@plp.com",
            password: "Dedan@25",
            profile: {
                firstName: "Dedan",
                lastName: "Okware",
                avatar: "https://example.com/avatars/dedan.png",
                phoneNumber: "254742367812"
            },
            university: {
                name: "Jomo Kenyatta University of Agriculture and Technology",
                domain: "jkuat.ac.ke",
                campus: "Juja",
                studentId: "JKUAT67890",
                type: "Public"
            },
            verification: {
                isVerified: false,
                verificationMethod: "email"
            },
            location: {
                country: "Kenya",
                city: "Kiambu",
                coordinates: {
                    latitude: -1.0954,
                    longitude: 37.0134
                }
            },
            preferences: {
                language: "sw",
                notifications: false
            },
            role: "user"
        },
    ]);

    // 4️⃣ Confirmation message
    console.log("✅ Sample user data successfully populated!");

    // 5️⃣ Disconnect from DB
    await mongoose.disconnect();
}

// Execute the function
main();
