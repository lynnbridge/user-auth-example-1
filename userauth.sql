DROP DATABASE IF EXISTS userauth;
CREATE DATABASE userauth;

\c userauth;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  email VARCHAR,
  password VARCHAR
);

INSERT INTO users (name, email, password)
  VALUES ('Tyler', 'tyler@demo.com', 'pass');

CREATE TABLE posts (
  ID SERIAL PRIMARY KEY,
  title VARCHAR,
  content TEXT
);

INSERT INTO posts (title, content)
  VALUES ('Space Test', 'Long long ago in a galaxy far away there once was a silly monkey who loved to dance and play games. And one day he played a trick on a treat and ended up with a sore thumb. The End.');
