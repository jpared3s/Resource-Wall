const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const methodOverride = require('method-override');
const { Pool } = require('pg');
const app = express()

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});;


app.use(methodOverride('_method'));

// router.get('/', (req, res) => {
//   pool.query(`SELECT * FROM resources LIMIT 5`)
//     .then((result) => {
//       console.log(result.rows);
//       const templateVars = {
//         resources: result.rows,
//         title: "Recent Resources"
//       };
//       res.render('home', templateVars);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send("Error retrieving recent resources");
//     });
// });

router.get('/', (req, res) => {
  pool.query(`
    SELECT resources.*, COALESCE(AVG(reviews.rating), 0) AS rating, COUNT(users_likes.user_id) AS likes
    FROM resources
    LEFT JOIN reviews ON resources.id = reviews.resource_id
    LEFT JOIN users_likes ON resources.id = users_likes.resource_id
    GROUP BY resources.id
    ORDER BY resources.id
    LIMIT 5;
  `)
    .then((result) => {
      console.log(result.rows);
      const templateVars = {
        resources: result.rows,
        title: "Recent Resources"
      };
      res.render('home', templateVars);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving recent resources");
    });
});

//search query (lightBnb)
router.post('/search', (req, res) => {
  console.log(req.body)
  const input = req.body.query
  pool.query(`
    SELECT resources.*, COALESCE(AVG(reviews.rating), 0) AS rating, COUNT(users_likes.user_id) AS likes
    FROM resources
    LEFT JOIN reviews ON resources.id = reviews.resource_id
    LEFT JOIN users_likes ON resources.id = users_likes.resource_id
    WHERE tags LIKE $1
    GROUP BY resources.id
    ORDER BY resources.id
    LIMIT 5;
  `, [`%${input}%`])
    .then((result) => {
      console.log(result.rows);
      const templateVars = {
        resources: result.rows,
        title: "Recent Resources"
      };
      res.json(result.rows)
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving recent resources");
    });
});


module.exports = router;
