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
        `SELECT users.username, resource_id FROM users
          INNER JOIN users_likes ON users.id = users_likes.user_id
          INNER JOIN resources ON user_likes.resource_id = resources.id
          WHERE users.id = $1;

      `,
        [usersId]
      )
      // returns newly created like - this may be unnecessary
      .then((result) => result.rows)
      .catch((err) => err.message)
  );
};

router.get("/:id/likes", (req, res) => {
  const templateVars = {
    user: users[req.session.user_id],
  };
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

module.exports = { addLike, getLikes, router };
