const express = require("express");
const router = express.Router();
const Seek = require("../models/seek.model");
const User = require("../models/user.model");

router.get("/", async (req, res) => {
  const user = await User.find({}).lean().exec();
  const seek = await Seek.find({})
    .populate("userId")
    .populate("category")
    .lean()
    .exec();
  return res.status(200).json({ data: seek });
});



router.get("/:id", async (req, res) => {
  const seek = await Seek.findById(req.params.id)
    .populate("userId")
    .populate("category")
    .lean()
    .exec();
  return res.status(200).json({ data: seek });
});

router.post("/", async (req, res) => {
  const seek = await Seek.create(req.body);
  return res.status(201).json({ data: seek });
});

router.patch("/:id", async (req, res) => {
  const seek = await Seek.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  return res.status(202).json({ data: seek });
});

router.delete("/:id", async (req, res) => {
  const seek = await Seek.findByIdAndDelete(req.params.id);
  return res.status(204).json();
});

module.exports = router;
