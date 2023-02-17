const authenticateUser = (email, password) => {
  let values = [email, password];
  return pool.query(`SELECT * FROM users WHERE email = $1`, values).then((result) => {

    if (result.row[0].passord === password) {
      return user;
    }
    return null;
  })
};

const getFavorites = (user) => {
  let values = [user];
  return pool.query(`SELECT * FROM users_resources WHERE user_id = $1 LIMIT 10`, values).then((result) => result.rows);
}


const searchByTags = (tags, limit) => {
	let values = [tags];
  return pool.query(`SELECT * FROM resources WHERE tags LIKE %$1% LIMIT ${limit}`, values).then((result) => result.rows);
}
