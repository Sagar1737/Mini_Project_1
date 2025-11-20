const express = require("express");
const app = express();
const port = 3000;

const items = require("./data/items.json");

app.use(express.static("public"));

app.get("/api/items", (req, res) => {
  res.json(items);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
