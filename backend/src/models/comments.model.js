const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  board: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  boardId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("comments", commentsSchema);
