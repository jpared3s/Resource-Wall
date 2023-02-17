const express = require("express");
const db = require("../db/connection");
const { Pool } = require("pg");
const router = express.Router();
const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "midterm",
});

router.post("/", (req, res) => {
  const userId = req.session.user_id;
  const resourceId = req.body.resourceId;

  pool
    .query(
      "SELECT * FROM users_likes WHERE user_id = $1 AND resource_id = $2;",
      [userId, resourceId]
    )
    .then((result) => {
      if (result.rowCount > 0) {
        console.log("conflict");
        res.status(409).send();
      } else {
        pool
          .query(
            `INSERT INTO users_likes (user_id, resource_id)
          VALUES ($1, $2)
          RETURNING *;
        `,
            [userId, resourceId]
          )
          // returns newly created like - this may be unnecessary
          .then((result) => {
            console.log(result);
            res.status(200).send();
          })
          .catch((err) => {
            console.log(err.message);
            res.status(500).send();
          });
      }
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).send();
    });
});

router.get("/", (req, res) => {
  const id = req.session.user_id;
  const email = req.session.user;
  console.log("id: ", id);
  const likeResources = `SELECT user_id, resource_id, resources.title,resources.description,resources.tags FROM users_likes LEFT JOIN resources ON users_likes.resource_id = resources.id WHERE user_id = $1;`;
  return db.query(likeResources, [id]).then((result) => {
    let resources = result.rows;

    console.log("resources: ", resources);
    res.render("likesPage", {
      email: email,
      id: id,
      resources: resources,
    });
  });
  //   const templateVars = {
  //     resources: likeResources,
  //   };
  //   pool
  //     .query(
  //       `SELECT user_id, resource_id, resources.title,resources.description,resources.tags FROM users_likes LEFT JOIN resources ON users_likes.resource_id = resources.id WHERE user_id = $1;`,
  //       [req.params.id]
  //     )
  //     .then((result) => {
  //       console.log(result.rows);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   res.render("likesPage", templateVars);
  // });

  // router.post("/", (req, res) => {});

  // router.delete("/:id", (req, res) => {
  //   // delete from table
  //   res.render("likesPage");
});

module.exports = router;
