const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
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

  res.json(assets);
});

module.exports = router;
