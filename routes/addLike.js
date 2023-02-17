const { Router } = require("express");
const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const db = require("../db/connection");

const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "midterm",
});

const addLike = (like) => {
  const { user_id, resource_id } = like;

  return (
    pool
      .query(
        `INSERT INTO users_likes (user_id, resource_id)
        VALUES ($1, $2)
        RETURNING *;
      `,
        [user_id, resource_id]
      )
      // returns newly created like - this may be unnecessary
      .then((result) => result.rows[0])
      .catch((err) => err.message)
  );
};

const getLikes = (usersId) => {
  return (
    pool
      .query(
        `SELECT * FROM resources JOIN users_likes ON resource_id = resources.id WHERE user_id = $1`,
        [usersId]
      )

      // returns newly created like - this may be unnecessary
      .then((result) => result.rows)

      .catch((err) => err.message)
  );
};

router.get("/:id/likes", (req, res) => {
  const userId = req.params;
  const likesResource = getLikes(userId);
  const templateVars = {
    user: {},
    resource: {},
    comments: {},
    uniqueID: req.params.id,
  };
  db.query(
    `SELECT username, users.id FROM users
    INNER JOIN users_likes ON users.id = users_likes.user_id
    WHERE user_likes.resource_id = $1`,
    values
  ).then((result) => {});
  res.render("likesPage", templateVars);
});

router.post("/:id/likes", (req, res) => {
  const like = req.body;
  db.addLike(like)
    .then((resources) => res.send({ resources }))
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

module.exports = router;
