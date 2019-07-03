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

CREATE TABLE purchased (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) NOT NULL,
  ticker_symbol VARCHAR NOT NULL,
  price INT NOT NULL,
  qty_bought INT NOT NULL,
  qty_left INT NOT NULL,
  date VARCHAR NOT NULL
);

CREATE TABLE sold (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) NOT NULL,
  ticker_symbol VARCHAR NOT NULL,
  price INT NOT NULL,
  qty_sold INT NOT NULL,
  date VARCHAR NOT NULL
);

INSERT INTO users (name, email, user_uid, available_balance) VALUES
('Tom', 'tom@email.com', '1234zxcv', 5000), 
('Sara', 'sara@email.com', '1234asdf', 3500), 
('Luz', 'luz@email.com', '1234qwer', 2000);

INSERT INTO purchased (user_id, ticker_symbol, price, qty_bought, date, qty_left) VALUES
(1, 'FB', 195, 5, 'July 2, 2019', 4), 
(1, 'AMZN', 1934, 1, 'July 2, 2019', 1), 
(1, 'NFLX', 375, 3, 'July 2, 2019', 2),
(1, 'NKE', 85, 2, 'July 2, 2019', 0),
(2, 'FB', 195, 3, 'July 2, 2019', 3),
(2, 'NKE', 85, 3, 'July 2, 2019', 2),
(3, 'WMT', 112, 4, 'July 2, 2019', 4),
(3, 'AMZN', 1934, 2, 'July 2, 2019', 2);

INSERT INTO sold (user_id, ticker_symbol, price, qty_sold, date) VALUES
(1, 'FB', 200, 1, 'July 3, 2019'), 
(1, 'NFLX', 380, 2, 'July 3, 2019'),
(1, 'NKE', 80, 2, 'July 3, 2019');