DROP DATABASE IF EXISTS ttpfs;
CREATE DATABASE ttpfs;

\c ttpfs;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  fb_user_id VARCHAR UNIQUE NOT NULL,
  seller_photo VARCHAR NULL
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) NOT NULL,
  stock_symbol VARCHAR NOT NULL,
  price INT NOT NULL,
  quantity INT NOT NULL,
  sold VARCHAR NOT NULL
);

