const { connectDB, mongoose } = require('./db');
   

const User = require('./Models/User');


async function main() {
    await connectDB();

    await User.deleteMany({});

    await User.insertMany([
        { name: "Rose Wambui", email: "alice@example.com", role: "admin" },
        { name: "Dedan Okware", email: "dedan@plp.com" },
    ]);

   

    console.log("Data populated");
    await mongoose.disconnect();
}

main();



