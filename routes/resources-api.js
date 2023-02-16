const express = require("express");
const router = express.Router();
const db = require("../db/connection");


router.get("/", (req, res) => {
  db.query(`SELECT id, title, description, tags FROM resources`)
  .then((results) => {
    res.send(results.rows);
  })
});

module.exports = router;