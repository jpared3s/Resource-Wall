/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

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

router.get('/', (req, res) => {
  console.log("get in there mate!");

  // console.log(req)
  const templateVars = {
    // user: users[req.session.user_id],
    // urls: urlsForUser(req.session.user_id, urlDatabase),
  };
  
  res.render('profileUpdate', templateVars);
}); 

router.post('/updatepass', (req, res) => {
  console.log("I need a new password!");
  // console.log(req.body.new_password);
  let bob = bcrypt.hashSync(req.body.new_password, 10);
  console.log(bcrypt.compareSync(req.body.new_password, bob));

  // pool.query(`SELECT * FROM users;`)
  //   .then((res) => console.log(res.rows))
  //   .catch((e) => console.log(e));
  }
);

router.post('/', (req, res) => {
  console.log("new post incoming");
  console.log(req.body.email);
  pool.query(`SELECT * FROM users;`)
  .then((res) => console.log(res.rows))
  .catch((e) => console.log(e));

  // console.log(req)
  const templateVars = {
    // user: users[req.session.user_id],
    // urls: urlsForUser(req.session.user_id, urlDatabase),
  };
  
  // res.render('profileUpdate', templateVars);
}); 


// router.put('/:email', (req, res) => {
//   console.log(req.params.body);
//   pool.query(`SELECT * from Users`).then(res => {
//     console.log(res.rows)})
//   /*
//   PSEUDO CODE pending update;
//   if (req.body.params.email) {
//     pool.query(`
//     UPDATE users
//     SET email = ${req.body.params}
//     WHERE id = currentuser
//     `).then(() => {console.log("Update successful!")});
//   }
//   if (req.body.params.email) {
//     pool.query(`
//     UPDATE users
//     SET password = bcrypt.hashSync(${req.body.params}, 12);
//     WHERE id = currentuser
//     `).then(() => {console.log("Update successful!")});
//   }
  
//   */

// });

// router.put('/:password', (req, res) => {
//   console.log(req.params);
//   /*
//   PSEUDO CODE pending update;
//   if (req.body.params.email) {
//     pool.query(`
//     UPDATE users
//     SET email = ${req.body.params}
//     WHERE id = currentuser
//     `).then(() => {console.log("Update successful!")});
//   }
//   if (req.body.params.email) {
//     pool.query(`
//     UPDATE users
//     SET password = bcrypt.hashSync(${req.body.params}, 12);
//     WHERE id = currentuser
//     `).then(() => {console.log("Update successful!")});
//   }
  
//   */

// });




module.exports = router;
