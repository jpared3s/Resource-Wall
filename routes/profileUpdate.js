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
const app = express();

app.use(methodOverride('_method'));

router.get('/', (req, res) => {
  const templateVars = {
    // user: users[req.session.user_id],
    // urls: urlsForUser(req.session.user_id, urlDatabase),
  };
  
  res.render('profileUpdate', templateVars);
}); 

router.put('/', (req, res) => {
  console.log(req.params.body);
  /*
  PSEUDO CODE pending update;
  if (req.body.params.email) {
    pool.query(`
    UPDATE users
    SET email = ${req.body.params}
    WHERE id = currentuser
    `).then(() => {console.log("Update successful!")});
  }
  if (req.body.params.email) {
    pool.query(`
    UPDATE users
    SET password = bcrypt.hashSync(${req.body.params}, 12);
    WHERE id = currentuser
    `).then(() => {console.log("Update successful!")});
  }
  
  */

});




module.exports = router;
