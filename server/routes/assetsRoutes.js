const express = require("express");
const router = express.Router();

const db = require("../db/knex");

// GET/fetch assets from db
router.get("/", async (req, res) => {
  try {
    const assets = await db("assets");
    res.json(assets);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch assets" });
  }
});

// POST/create asset
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

// DELETE/remove asset by id
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

// PUT/update asset
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
