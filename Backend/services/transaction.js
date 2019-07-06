const { db } = require('./pgp');
const TransactionService = {};

//CREAT TRANSACTION
TransactionService.create = (user_id, ticker_symbol, price, qty, type, date) => {
    const sql = `INSERT INTO transactions (user_id, ticker_symbol, price, qty, type, date) VALUES ($[user_id], $[ticker_symbol], $[price], $[qty], $[type], $[date]) RETURNING id;`;
    return db.one(sql, { user_id, ticker_symbol, price, qty, type, date });
}

//GET ALL TRANSACTIONS BY USER ID
TransactionService.read = (user_id) => {
    const sql = `
      SELECT *       
      FROM transactions
      WHERE
        transactions.user_id = $[user_id];
      `;
    return db.any(sql, { user_id });
}

//GET TRANSACTIONS BY USER ID AND TYPE
TransactionService.readByType = (user_id, type) => {
    const sql = `
      SELECT *       
      FROM transactions
      WHERE
        transactions.user_id = $[user_id] AND transactions.type = $[type];
      `;
    return db.any(sql, { user_id, type });
}

module.exports = { TransactionService, };