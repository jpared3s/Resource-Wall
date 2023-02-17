const express = require("express");
const router = express.Router();
const db = require("../db/connection");


router.get("/", (req, res) => {
  db.query(`SELECT id, title, description, tags FROM resources`)
  .then((results) => {
    res.send(results.rows);
  })
});

router.get("/tags/:id", (req, res) => {
  console.log(req.params.id);
  let values = [`%${req.params.id}%`];
  db.query(`SELECT id, title, description, tags FROM resources WHERE tags LIKE $1 ;`, values)
  .then((results) => {
    res.send(results.rows);
  })
});

module.exports = router;