const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const app = express();
const bcrypt = require("bcrypt");

const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "midterm",
});

router.get("/", (req, res) => {
  res.render("registration", { error: "" });
});

router.post("/", (req, res) => {
  const queryForCheckingDuplicate = "SELECT email FROM users WHERE email = $1;";
  pool
    .query(queryForCheckingDuplicate, [req.body.email])
    .then((result) => {
      // console.log(result);
      if (result.rowCount > 0) {
        console.log("There is an account with the same email address");
        res.render("registration", { error: "Duplicate" });
      } else {
        const passwordHash = bcrypt.hashSync(req.body.password, 10);
        const queryForInsertUser =
          "INSERT INTO users (username,email,password) VALUES($1,$2,$3) RETURNING*;";
        pool
          .query(queryForInsertUser, [
            req.body.username,
            req.body.email,
            passwordHash,
          ])
          .then((result) => {
            console.log(result);
            res.redirect("login");
          })
          .catch((err) => {
            console.log(err);
            res.render("registration", { error: "Server internal error" });
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  // const queryString1 = `SELECT email FROM users WHERE email =$1;`;
  // const queryString2 = `INSERT INTO users ( username, email, password)
  // VALUES($1, $2, $3)
  // RETURNING *;`;

  // pool
  //   .query(queryString1, [req.body.email])
  //   .then((res) => {
  //     if (res.rows[0]) {
  //       console.log("error: exists username");
  //     }
  //     const password = req.body.password;
  //     const passwordHash = bcrypt.hashSync(password, 10);
  //     const inputValue = [req.body.username, req.body.email, passwordHash];

  //     return pool.query(queryString2, inputValue);
  //   })
  //   .then((data) => {
  //     res.redirect("/login");
  //     console.log(data.rows[0]);
  //   })
  //   .catch((err) => {
  //     res.status(500);
  //     console.log(err);
  //   });
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
