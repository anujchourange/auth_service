const express = require("express");
const createError = require("http-errors");
require("dotenv").config();

const app = express();

app.use(express.json());

app.get("/", async (req, res, next) => {
  res.send("HEllo from express");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
