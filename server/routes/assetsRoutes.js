const express = require("express");
const router = express.Router();

const db = require("../db/knex");

router.get("/", async (req, res) => {
  try {
    const assets = await db("assets");
    res.json(assets);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch assets" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, symbol, category } = req.body;

    const [newAsset] = await db("assets")
      .insert({ name, symbol, category })
      .returning("*");

    res.status(201).json(newAsset);
  } catch (err) {
    res.status(500).json({ error: "Failed to create asset" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const deleted = await db("assets").where({ id }).del();

    if (deleted === 0) {
      return res.status(404).json({ error: "Asset not found" });
    }

    res.json({ message: "Asset deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete asset" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, symbol, category } = req.body;

    const [updatedAsset] = await db("assets")
      .where({ id })
      .update({ name, symbol, category })
      .returning("*");

    if (updatedAssets.length === 0) {
      return res.status(404).json({ error: "Asset not found" });
    }

    res.json(updatedAssets[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to update asset" });
  }
});

module.exports = router;
