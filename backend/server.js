require("dotenv").config();
const app = require("./src/app");
const express = require("express");
const connectDb = require("./src/db/db");

connectDb();
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
