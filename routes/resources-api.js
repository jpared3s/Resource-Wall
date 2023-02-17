const express = require("express");
const router = express.Router();
const db = require("../db/connection");


router.get("/", (req, res) => {
  db.query(`SELECT title, description, tags, ROUND(avg(rating), 1) as avg_rating, count (users_likes.*) as likes FROM resources LEFT JOIN reviews on resources.id = reviews.resource_id LEFT JOIN users_likes ON resources.id = users_likes.resource_id GROUP BY title, description, tags ORDER BY likes DESC;`)
  .then((results) => {
    res.send(results.rows);
  })
});

router.get("/tags/:id", (req, res) => {
  let values = [`%${req.params.id}%`];
  db.query(`SELECT title, description, tags, ROUND(avg(rating), 1) as avg_rating, count (users_likes.*) as likes FROM resources LEFT JOIN reviews on resources.id = reviews.resource_id LEFT JOIN users_likes ON resources.id = users_likes.resource_id WHERE tags LIKE $1 GROUP BY title, description, tags ORDER BY likes DESC;`, values)
  .then((results) => {
    res.send(results.rows);
  })
});

module.exports = router;