const users = require('./data/users.json');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');


const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = function(email) {
  let user;
  let value = [email]
  return pool
  .query(`SELECT * FROM users WHERE email = $1`, value)
  .then((result) => {
    for (let row of result.rows) {
      if (row.email === email) {
        user = row;
        return user;
      } 
    }
    return null;
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  });
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithId = function(id) {
  let user;
  let value = [id]
  return pool
    .query(`SELECT * FROM users WHERE id = $1`, value)
    .then((result) => {
      for (let row of result.rows) {
        if (row.id === id) {
          user = row;
          return user;
        }
      }
      return null;
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */

const addUser =  function(user) {
  let values = [user.name, user.email, user.password];
  return pool
  .query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;`, values)
    .then((result) => {
      console.log(result.rows)
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */

// pending updates
// const getAllProperties = function (options, limit = 10) {
//   // 1
//   const queryParams = [];
//   // 2
//   let queryString = `
//   SELECT properties.*, avg(property_reviews.rating) as average_rating
//   FROM properties
//   JOIN property_reviews ON properties.id = property_id
//   `;
//   // 3
//   if (options.city) {
//     if (queryParams.length === 0) {
//       queryString += `WHERE `;
//     }
//     if (queryParams.length > 0) {
//       queryString += `
//       AND `;
//     }
//     queryParams.push(`%${options.city}%`);
//     queryString += `city LIKE $${queryParams.length} `;
//   }
  
//   if (options.owner_id) {
//     if (queryParams.length === 0) {
//       queryString += `WHERE `;
//     }
//     if (queryParams.length > 0) {
//       queryString += `
//       AND `;
//     }
//     queryParams.push(`%${options.owner_id}%`);
//     queryString += `owner_id = $${queryParams.length} `;
//   }

//   if (options.minimum_price_per_night) {
//     if (queryParams.length === 0) {
//       queryString += `WHERE `;
//     }
//     if (queryParams.length > 0) {
//       queryString += `
//       AND `;
//     }
//     queryParams.push(`${options.minimum_price_per_night}`);
//     queryString += `cost_per_night / 100 >= $${queryParams.length} `;
//   }

//   if (options.maximum_price_per_night) {
//     if (queryParams.length === 0) {
//       queryString += `WHERE `;
//     }
//     if (queryParams.length > 0) {
//       queryString += `
//       AND `;
//     }
//     queryParams.push(`${options.maximum_price_per_night}`);
//     queryString += `cost_per_night / 100 <= $${queryParams.length} `;
//   }

//   // 4
//   queryString += `
//   GROUP BY properties.id `
//   if (options.minimum_rating) {
//     queryParams.push(`${options.minimum_rating}`);
//     queryString += `
//     HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
//   }
//   queryParams.push(limit);
//   queryString += `
//   ORDER BY cost_per_night
//   LIMIT $${queryParams.length};
//   `;

//   // 5
//   console.log(queryString, queryParams);

//   // 6
//   return pool.query(queryString, queryParams).then((res) => res.rows);
// };



// exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */



const addResource = function (resource) {

  console.log(resource);

  let values = [title, description, tags];
  console.log(values);

  return pool
    .query(`
    INSERT INTO resources (owner_id, title, description, tags) VALUES ($1, $2, $3)
    RETURNING *;`, values)
    .then((result) => {
      console.log("~~~~~~~insert success~~~~~~~~~~~~~~~~: ", result.rows);
    })
    .catch((err) => {
      console.log("~~~~~~~~~insert failure~~~~~~~~~~~~~~: ", err.message);
      return null;
    });

};

exports.addResource = addResource;
