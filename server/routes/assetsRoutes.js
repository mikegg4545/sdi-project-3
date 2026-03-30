const express = require("express");
const router = express.Router();

const assets = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    category: "Store of Value",
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    category: "Smart Contracts",
  },
  {
    id: 3,
    name: "Solana",
    symbol: "SOL",
    category: "Layer 1",
  },
];
router.get("/", (req, res) => {
  res.json(assets);
});
router.post("/", (req, res) => {
  const newAsset = {
    id: assets.length + 1,
    name: req.body.name,
    symbol: req.body.symbol,
    category: req.body.category,
  };

  assets.push(newAsset);

  res.status(201).json(newAsset);
});
router.delete("/:id", (req, res) => {
  const assetId = Number(req.params.id);

  assets = assets.filter((asset) => asset.id !== assetId);

  res.json({ message: "Asset deleted" });
});
module.exports = router;
