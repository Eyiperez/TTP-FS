DROP DATABASE IF EXISTS ttpfs;
CREATE DATABASE ttpfs;

\c ttpfs;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  user_uid VARCHAR UNIQUE NOT NULL,
  user_photo VARCHAR NULL,
  available_balance INT NULL
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) NOT NULL,
  ticker_symbol VARCHAR NOT NULL,
  price INT NOT NULL,
  qty INT NOT NULL,
  type VARCHAR NOT NULL,
  date VARCHAR NOT NULL
);

CREATE TABLE stocks (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) NOT NULL,
  ticker_symbol VARCHAR NOT NULL,
  stock_name VARCHAR NULL,
  qty_owned INT NULL
);

INSERT INTO users (name, email, user_uid, available_balance) VALUES
('Tom', 'tom@email.com', '1234zxcv', 5000), 
('Sara', 'sara@email.com', '1234asdf', 3500), 
('Luz', 'luz@email.com', '1234qwer', 2000);

INSERT INTO transactions (user_id, ticker_symbol, price, qty, type, date) VALUES
(1, 'FB', 195, 5, 'bought', 'July 2, 2019'), 
(1, 'AMZN', 1934, 1, 'bought', 'July 2, 2019'), 
(1, 'NFLX', 375, 3, 'bought', 'July 2, 2019'),
(1, 'NKE', 85, 2, 'bought', 'July 2, 2019'),
(2, 'FB', 195, 3, 'bought', 'July 2, 2019'),
(2, 'NKE', 85, 3, 'bought', 'July 2, 2019'),
(3, 'WMT', 112, 4, 'bought', 'July 2, 2019'),
(1, 'FB', 200, 1, 'sold', 'July 3, 2019'), 
(1, 'NFLX', 380, 2, 'sold', 'July 3, 2019'),
(1, 'NKE', 80, 2, 'sold', 'July 3, 2019'),
(3, 'AMZN', 1934, 2, 'bought', 'July 2, 2019');

INSERT INTO stocks (user_id, ticker_symbol, stock_name, qty_owned) VALUES
(1, 'FB', 'facebook', 4), 
(1, 'NFLX', 'netflix', 1),
(1, 'AMZN', 'amazon', 1),
(2, 'FB', 'facebook', 3),
(2, 'NKE', 'nike', 3),
(3, 'WMT', 'walmart', 4),
(3, 'AMZN', 'amazon', 2);
