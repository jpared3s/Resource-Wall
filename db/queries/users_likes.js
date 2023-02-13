const db = require('../connection');

const getLikes = () => {
  return db.query('SELECT COUNT(*), resource_id from users_likes JOIN resources ON resources.id = resource_id GROUP BY resource_id;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getLikes };
