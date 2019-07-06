const { db } = require('./pgp');
const TransactionService = {};

//CREAT USER
TransactionService.create = (user_id, ticker_symbol, price, qty, type, date) => {
    const sql = `INSERT INTO transactions (user_id, ticker_symbol, price, qty, type, date) VALUES ($[user_id], $[ticker_symbol], $[price], $[qty], $[type], $[date]) RETURNING id;`;
    return db.one(sql, { user_id, ticker_symbol, price, qty, type, date });
}

module.exports = { TransactionService, };