// draft a schema
const {mongoose} = require('../db'); //importing mongoose from db.js file
const {Schema} = mongoose; // importing schema from mongoose
const bcrypt = require('bcryptjs');




// define schema(rules to follow to create collections aka tables in the DB)
const userSchema = new Schema({
    name: {type: String, required: true},
    email: { type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true},
    profile: {firstName: String, lastName: String, avatar: String, phoneNumber: String},
    university: {
  name: { type: String, required: true },
  domain: { type: String, required: true },
  campus: { type: String, required: true },
  studentId: { type: String, required: true },
  type: { type: String, required: true }
},
    verification: {isVerified:{type: Boolean, default: false}, verificationMethod: String, verifiedAt: Date},
    location: {country: String, city: String, coordinates: {latitude: Number, longitude: Number}},
    preferences: { language: {type: String, default: "en"}, notifications: {type: Boolean, default: true}},
    role: {type: String, default: "user"}
}, {timestamps: true});

// Pre-save hook: hashes password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // only hash if password is new/changed
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


//create a model(represents the collections aka tables)
const User = mongoose.model("User", userSchema)

//export the model
module.exports = User;

