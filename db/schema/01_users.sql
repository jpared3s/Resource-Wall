-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);


DROP TABLE IF EXISTS resources CASCADE;

CREATE TABLE resources (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  tags VARCHAR(255) NOT NULL,
  owner_id INT REFERENCES users(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS reviews CASCADE;

CREATE TABLE reviews(
  id SERIAL PRIMARY KEY NOT NULL,
  resource_id INTEGER REFERENCES resources(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  comment TEXT
);

DROP TABLE IF EXISTS users_resources CASCADE;

CREATE TABLE users_resources (
  id SERIAL PRIMARY KEY NOT NULL,
  resource_id INT REFERENCES resources(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS users_likes CASCADE;

CREATE TABLE users_likes (
  id SERIAL PRIMARY KEY NOT NULL,
  resource_id INT REFERENCES resources(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE
);

