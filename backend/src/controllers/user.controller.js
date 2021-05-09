const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.get("/", async (req, res) => {
  const user = await User.find({}).lean().exec();
  return res.status(200).json({ data: user });
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).lean().exec();
  return res.status(200).json({ data: user });
});

router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  return res.status(201).json({ data: user });
});

router.patch("/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  return res.status(202).json({ data: user });
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  return res.status(204).json();
});

module.exports = router;
