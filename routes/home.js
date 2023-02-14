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
 const recentResource = pool.query(`SELECT * FROM resources LIMIT 5`)
 const templateVars = {
  resources: recentResource,
  title: "Recent Resources"
};

res.render('home', templateVars);
});



module.exports = router;
