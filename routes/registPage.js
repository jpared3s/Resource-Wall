const express = require("express");
const router = express.Router();
const db = require("../db/connection");

// router.set("view engine", "ejs");

router.get("/register", (req, res) => {
  res.render("registration");
});

module.exports = router;
