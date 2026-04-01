const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const assetsRoutes = require("./routes/assetsRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/categories", categoriesRoutes);

app.get("/", (req, res) => {
  res.send("SignalStack API is running");
});

app.use("/assets", assetsRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
