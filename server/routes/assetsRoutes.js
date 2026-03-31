const express = require("express");
const router = express.Router();

let assets = [
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
router.put("/:id", (req, res) => {
  const assetId = Number(req.params.id);

  const existingAsset = assets.find((asset) => asset.id === assetId);

  if (!existingAsset) {
    return res.status(404).json({ error: "Asset not found" });
  }

  const updatedAsset = {
    id: assetId,
    name: req.body.name,
    symbol: req.body.symbol,
    category: req.body.category,
  };

  assets = assets.map((asset) => (asset.id === assetId ? updatedAsset : asset));

  res.json(updatedAsset);
});

module.exports = router;
