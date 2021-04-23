const express = require("express");
const router = express.Router();
const Host = require("../models/host.model");
const Categories = require("../models/category.model");

router.get("/", async (req, res) => {
  let categories = await Categories.find({}).lean().exec();

  const host = await Host.find({})
    .populate("userId")
    .populate("category")
    .lean()
    .exec();
  return res.status(200).json({ data: host });
});

router.get("/:id", async (req, res) => {
  const host = await Host.findById(req.params.id)
    .populate("userId")
    .populate("category")
    .lean()
    .exec();
  return res.status(200).json({ data: host });
});

router.post("/", async (req, res) => {
  const host = await Host.create(req.body);
  return res.status(201).json({ data: host });
});

router.patch("/:id", async (req, res) => {
  const host = await Host.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  return res.status(202).json({ data: host });
});

router.delete("/:id", async (req, res) => {
  const host = await Host.findByIdAndDelete(req.params.id);
  return res.status(204).json();
});

module.exports = router;
