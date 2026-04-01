const express = require("express");
const router = express.Router();
const db = require("../db/knex");

// GET /categories
router.get("/", async (req, res) => {
  try {
    const categories = await db("categories");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

module.exports = router;
