const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.get("/", (req, res) => {
  res.send("connected");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
  console.log(`Server started on Port ${PORT}.`);
});
