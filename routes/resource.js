const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../db/connection");
const app = express();

// router.get("/:id", (req, res) => {
//   let values = [req.params.id];
//   const templateVars = {
//     user: {},
//     resource: {},
//     comments: {},
//     uniqueID: req.params.id,
//   };
//   db.query(`SELECT * from users WHERE email = $1`, [req.session.user])
//   .then((result) => {
//     let currentUser = result.rows[0];
//         templateVars.user = currentUser;
//         console.log("line 19:")
//         console.log(currentUser);
//     // let currentUser = 
  
//   })
//   .catch((e) => console.log(e))
//     .then(
//       db.query(`SELECT resources.id, title, description, tags, owner_id, alias from resources LEFT JOIN reviews ON resource_id = resources.id WHERE alias = $1 ;`, values)
//       .then((result) => {
//         let currentResource = result.rows[0];
//         templateVars.resource = currentResource;
//         // console.log("-------------------25-------------")
//         // console.log(templateVars.resource)
//         templateVars.comments = result.rows;  
//         return templateVars
//         // console.log("-------------------30----------");
//         // console.log(templateVars.resource);
//       }).then((templateVars) => {
//         res.render('resource', templateVars);
//         // console.log("-------------------32----------");
//         // console.log(templateVars.resource);
//       }
//       )
//     )

//   // res.render('addResource', templateVars);
// })

router.get("/:id", (req, res) => {
  let values = [req.params.id];
  let pageExists = true;
  const templateVars = {
    user: {
      email: req.session.user,
      id: req.session.user_id,
    },
    resource: {},
    comments: {},
    uniqueID: req.params.id,
  };

  db.query(`SELECT resources.id, title, description, tags, owner_id, alias, resource_id, user_id, comment, rating from resources LEFT JOIN reviews ON resource_id = resources.id WHERE alias = $1 ;`, values)
    .then((result) => {
      if (result.rowCount === "0") {
        pageExists = false;
        console.log("telegram from line 64")
        console.log(result.rowCount);
        return res.send("Sorry, this link does not refer to any resource");
      } else {
        let currentResource = result.rows[0];
        templateVars.resource = currentResource;
        // console.log("-------------------70-------------")
        // console.log(templateVars.resource)
        templateVars.comments = result.rows;
        return templateVars
        // console.log("-------------------30----------");
        // console.log(templateVars.resource);
      }
    }).then((templateVars) => {
      if (pageExists === true) {
        res.render('resource', templateVars);
      }
      // console.log("-------------------32----------");
      // console.log(templateVars.resource);
    }
    )


})

router.post("/:id", (req, res) => {
  // console.log(req.body);
  // console.log("line 47")
  // console.log(req.session)
  let values = [req.session.user_id, req.params.id, req.body.comment, req.body.rating];
  console.log(values);

  db.query(`INSERT into reviews (user_id, resource_id, comment, rating) values ($1, $2, $3, $4) RETURNING *;`, values).then((result) => {
    // res.send("okay");
    return res.json(result.rows[0]);
  })

})

 

module.exports = router;