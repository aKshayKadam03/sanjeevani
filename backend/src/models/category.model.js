const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  tags: [{ type: String, required: true }],
});

module.exports = mongoose.model("categories", categorySchema);
