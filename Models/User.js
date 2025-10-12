// draft a schema
const {mongoose} = require('../db'); //importing mongoose from db.js file
const {Schema} = mongoose; // importing schema from mongoose



// define schema(rules to follow to create collections aka tables in the DB)
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone_number: {type: Number, required: true},
    university: {type: String, required: true},
    role: {type: String, default: "user"}
}, {timestamps: true});


//create a model(represents the collections aka tables)
const User = mongoose.model("User", userSchema)

//export the model
module.exports = User;

