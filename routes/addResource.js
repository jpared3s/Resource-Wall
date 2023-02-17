const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const db = require("../db/connection");
const app = express();
const generateRandomString = () => {
  let output = Math.random().toString(36)
  return output.slice(output.length - 6);
};

router.get("/", (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/login");

  } else {

    console.log(req.body);
    const templateVars = {
      // user: users[req.session.user_id],
      user: {},
      
    };
    db.query(`SELECT * from users WHERE email = $1`, [req.session.user]).then((result) => {
      let currentUser = result.rows[0];
      templateVars.user = currentUser;
  
    }).catch((e) => console.log(e)).then(() => {
      // console.log(templateVars.user);
      res.render('addResource', templateVars)} );
  
    // res.render('addResource', templateVars);
  }
});

router.post("/", (req, res) => {
  const uniqueID = generateRandomString();
  console.log("posting incoming for resources :", req.body);
  let values = [req.body.url, req.body.description, req.body.tags, req.session.user_id, uniqueID];
  return db.query(`
  INSERT INTO resources (title, description, tags, owner_id, ALIAS) VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
  `,
  values).then((result) => {
    
    return res.json(result.rows[0]);
  }).catch(e => result.send(e));
  
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