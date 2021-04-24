const express = require("express");
const router = express.Router();
const Comment = require("../models/comments.model");

router.get("/", async (req, res) => {
  const comments = await Comment.find({}).populate("userId").lean().exec();
  return res.status(200).json({ data: comments });
});

router.get("/:id", async (req, res) => {
  const comments = await Comment.findById(req.params.id).lean().exec();
  return res.status(200).json({ data: comments });
});

router.post("/", async (req, res) => {
  const comments = await Comment.create(req.body);
  return res.status(201).json({ data: comments });
});

router.patch("/:id", async (req, res) => {
  console.log(req.params.id);
  const comments = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  return res.status(202).json({ data: comments });
});

router.delete("/:id", async (req, res) => {
  const comments = await Comment.findByIdAndDelete(req.params.id);
  return res.status(204).json();
});

module.exports = router;
