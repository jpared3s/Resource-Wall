const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const db = require("../db/connection");
const app = express();




router.get("/", (req, res) => {
  console.log(req.body);
  const templateVars = {
    // user: users[req.session.user_id],
    user: req.session.user_id,

  };
  res.render('addResource', templateVars);
});

router.post("/", (req, res) => {
  console.log("posting incoming for resources :", req.body);
  let values = [req.body.url, req.body.description, req.body.tags, req.session.user_id];
  return db.query(`
  INSERT INTO resources (title, description, tags, owner_id) VALUES ($1, $2, $3, $4)
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