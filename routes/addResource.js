const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const db = require("../db/connection");
const app = express();




router.get("/", (req, res) => {
  console.log(req.body);
  res.render('addResource');
});

router.post("/", (req, res) => {
  console.log("posting incoming for resources :", req.body);
  let values = [req.body.url, req.body.description, req.body.tags];
  return db.query(`
  INSERT INTO resources (title, description, tags) VALUES ($1, $2, $3)
  RETURNING *;
  `,
  values).then((res) => {
    return res.rows[0];
  }).catch(e => res.send(e));
  
});

// code below is for testing, delete later
// router.get("/123", (req, res) => {
//   console.log("get request for 123");
//   return db.query(`
//   select * FROM resources WHERE tags LIKE '%baseball%';
//   `).then((result) => {
//     console.log(result.rows);
//     res.send(result.rows);
//   }).catch(e => res.send(e));
  
// });

module.exports = router;