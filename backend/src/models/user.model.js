const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  img: { type: String, required: true },
  phone: { type: String, required: true },
  pan: { type: String, required: true },
  verified: { type: Boolean, required: true },
});

module.exports = mongoose.model("users", userSchema);
