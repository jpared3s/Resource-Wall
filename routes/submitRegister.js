const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const app = express();
const bcrypt = require("bcrypt");

const db = require("../db/connection");




const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "midterm",
});

router.post("/register", (req, res) => {
  const queryString1 = `SELECT email FROM users WHERE email =$1;`;
  const queryString2 = `INSERT INTO users ( username, email, password)
  VALUES($1, $2, $3)
  RETURNING *;`;

  pool
    .query(queryString1, [req.body.email])
    .then((res) => {
      if (res.rows[0]) {
        console.log("error: exists username");
      }
      const password = req.body.password;
      const passwordHash = bcrypt.hashSync(password, 10);
      const inputValue = [req.body.username, req.body.email, passwordHash];


      return pool.query(queryString2, inputValue);

    })
    .then((data) => {
      res.redirect("/login");
      console.log(data.rows[0]);
    })
    .catch((err) => {
      res.status(500);
      console.log(err);
    });
});
//   pool
//     .query(
//       `
//   INSERT INTO users (name,email,password)
//   VALUES($1,$2,$3)
//   RETURNING*;
//   `,
//       [name, email, password]
//     )
//     .then((result) => {
//       console.log(result.rows[0]);
//     })
//     .catch((err) => {
//       console.log(err.message);
//       return null;
//     });
//   res.redirect("/");
// });

module.exports = router;
