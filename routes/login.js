const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const methodOverride = require('method-override');
const { Pool } = require('pg');
const db = require('../db/connection');
const app = express()

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});;

app.use(methodOverride('_method'));
router.get('/', (req, res) => {
  const user_id = req.session['user_id'];
  pool.query('SELECT * FROM users WHERE id = $1', [user_id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching user');
      return;

    }
    if (result.rows.length === 0) {
      const templateVars = {
        user: {
          email: null,
          id: null
        }
      };
      res.render('login', templateVars);
      return;
    }
    const user = result.rows[0];//not using
    const templateVars = {
      user: {
        email: user.email,
        id: user.id
      }

    };
    res.render('login', templateVars);

  });
});


router.post('/', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  pool.query(`
    SELECT *
    FROM users
    WHERE email = $1;
    `, [email])
    .then(result => {

      if (result.rows.length > 0 && bcrypt.compareSync(req.body.password, result.rows[0].password)) {
        console.log(result);
        req.session.user = req.body.email;
        req.session.user_id = result.rows[0].id;
        res.redirect('/profile');
      } else {
        res.send('Error: invalid email or password');
      }
    })
    .catch(err => console.error('query error', err.stack));
});

module.exports = router;
