const mongoose = require("mongoose");

//seekSchema

const seekSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    details: { type: String, required: true },
    category: { type: String, required: true },
    city: { type: String, required: true },
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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      rel: "users",
      required: true,
    },
    funds: { type: Number },
    fundsRaised: { type: Number },
    claimed: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("seeks", seekSchema);
