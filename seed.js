const { connectDB, mongoose } = require('./db');
   

const User = require('./Models/User');


async function main() {
    await connectDB();

    await User.deleteMany({});

    await User.insertMany([
        { name: "Rose Wambui", email: "alice@example.com", password: "Rose@25", phone_number: 0797563426, university: "UON", role: "admin" },
        { name: "Dedan Okware", email: "dedan@plp.com", password: "Dedan@25", phone_number: 0742367812, university: "JKUAT" },
    ]);

   

    console.log("Data populated");
    await mongoose.disconnect();
}

main();



