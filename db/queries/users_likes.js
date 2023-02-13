const db = require('../connection');

const getLikes = () => {
  return db.query('SELECT COUNT(*) from users_likes GROUP BY resouce_id;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getLikes };
