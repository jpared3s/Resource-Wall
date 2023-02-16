
const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const methodOverride = require('method-override');
const { Pool } = require('pg');
const app = express();
const db = require("../db/connection");


const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});;

app.use(methodOverride('_method'));

router.get('/', (req, res) => {
  console.log("get in there mate!");
  const templateVars = {
    // user: users[req.session.user_id],
    user: {},
    
  };
  db.query(`SELECT * from users WHERE email = $1`, [req.session.user]).then((result) => {
    let currentUser = result.rows[0];
    templateVars.user = currentUser;

  }).catch((e) => console.log(e)).then(() => {
    // console.log(templateVars.user);
    res.render('profileUpdate', templateVars);
  } );
});

router.post('/updatepass', (req, res) => {
  console.log("I need a new password!");
  // console.log(req.body.new_password);
  // console.log(bcrypt.compareSync(req.body.new_password, bob));
  let currentPass = req.body.current_password;
  pool.query(`select * from users WHERE email = $1;`, [req.session.user]).then((result) => {

    if (bcrypt.compareSync(currentPass, result.rows[0].password)) { 
      let values = [bcrypt.hashSync(req.body.new_password, 10), req.session.user_id];
      // console.log(values);

      pool.query(`UPDATE users SET password = $1 WHERE id = $2 returning *;`, values)
        .then((result) => {
          console.log(result);
          return res.json(result.rows[0])
        
        })
        .catch((e) => console.log(e));
  
      
    } else {
      console.log(`53: password no bueno`);
      res.status(500).send("Sorry, your current password did not match our records, please try again!");
      // res.send("sorry, wrong password!");
    }

  }
  
  )
});

router.post('/', (req, res) => {
  console.log("new post incoming");
  console.log(req.body.email);
  req.session.user = req.body.email;
  pool.query(`UPDATE users SET email = '${req.body.email}' WHERE id = '${req.session.user_id}';`)  
  .then(() => {
    console.log("email update success");
    // req.session.user = req.body.email;
    res.send("update successful")
  })
  .catch((e) => console.log(e));

  // console.log(req)
  const templateVars = {
    // user: users[req.session.user_id],
    // urls: urlsForUser(req.session.user_id, urlDatabase),
  };

  // res.render('profileUpdate', templateVars);
});


module.exports = router;