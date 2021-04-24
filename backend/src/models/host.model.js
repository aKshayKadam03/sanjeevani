const mongoose = require("mongoose");

//hostSchema

const hostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    details: { type: String, required: true },

    city: { type: String, required: true },
    tag: { type: String },
    location: {
      type: {
        type: String,
        enum: [`Point`],
        required: true,
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
        required: true,
      },
    },
    category: {
      type: String,
      ref: "categories",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    claimed: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("hosts", hostSchema);
