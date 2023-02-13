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
    return res.row[0];
  }).catch(e => res.send(e));
  
});

module.exports = router;