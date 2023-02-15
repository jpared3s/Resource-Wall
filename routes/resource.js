const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const db = require("../db/connection");
const app = express();



router.get("/:id", (req, res) => {
  let values = [req.params.id];
  const templateVars = {
    // user: users[req.session.user_id],
    user: {},
    resource: {},
    comments: {},
    uniqueID: req.params.id,
  };
  db.query(`SELECT resources.id, title, description, tags, owner_id, alias from resources LEFT JOIN reviews ON resource_id = resources.id WHERE alias = $1;`, values)
  .then((result) => {
    // let currentUser = 
    let currentResource = result.rows[0];
    templateVars.resource = currentResource;
    console.log("-------------------25-------------")
    console.log(templateVars.resource)
    templateVars.comments = result.rows;    
  })
  .catch((e) => console.log(e))
  .then(db.query(`SELECT * from users WHERE email = $1`, [req.session.user]).then((result) => {
    let currentUser = result.rows[0];
    templateVars.user = currentUser;
  }).then(() => {

    res.render('resource', templateVars)
  }

  )
    
    
  )

  // res.render('addResource', templateVars);
})

router.post("/:id", (req, res) => {
  console.log(req.body)
  let values = [req.body.user, req.body.resourceID, req.body.comment, req.body.rating];
  console.log(values);
  db.query(`INSERT into reviews (resource_id, user_id, comment, rating) values ($1, $2, $3, $4) RETURNING *;`, values).then((res) => {
    // res.send("okay");
    return res.rows[0];
  })
})

 

module.exports = router;