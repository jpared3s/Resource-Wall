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
router.get("/", (req, res) => {
  const likeResources = `SELECT user_id, resource_id, resources.title,resources.description,resources.tags FROM users_likes LEFT JOIN resources ON users_likes.resource_id = resources.id WHERE user_id = 1;`;
  return db.query(likeResources).then((result) => {
    let resources = result.rows;

    console.log("resources: ", resources);
    res.render("likesPage", { resources: resources });
  });
  const templateVars = {
    resources: likeResources,
  };
  pool
    .query(
      `SELECT user_id, resource_id, resources.title,resources.description,resources.tags FROM users_likes LEFT JOIN resources ON users_likes.resource_id = resources.id WHERE user_id = $1;`,
      [req.params.id]
    )
    .then((result) => {
      console.log(result.rows);
    })
    .catch((err) => {
      console.log(err);
    });
  res.render("likesPage", templateVars);
});

// router.post("/", (req, res) => {});

// router.delete("/:id", (req, res) => {
//   // delete from table
//   res.render("likesPage");
// });

module.exports = router;
