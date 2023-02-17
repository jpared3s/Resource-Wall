const db = require('../connection');

const getFavourites = () => {
  //   return db.query('SELECT * FROM resources JOIN users_resources ON resource_id = resources.id WHERE user_id = <current user>;')
  return db.query('SELECT * FROM resources JOIN users_resources ON resource_id = resources.id;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getFavourites };
