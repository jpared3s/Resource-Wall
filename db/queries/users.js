const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT username, email, count(resources.*) as submissions FROM users LEFT JOIN resources on users.id = resources.owner_id GROUP BY users.id ORDER BY submissions DESC;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUsers };
