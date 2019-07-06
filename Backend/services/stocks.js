const { db } = require('./pgp');
const StocksService = {};

//ADD STOCK
StocksService.create = (user_id, ticker_symbol, stock_name, qty_owned) => {
    const sql = `INSERT INTO transactions (user_id, ticker_symbol, stock_name, qty_owned) VALUES ($[user_id], $[ticker_symbol], $[stock_name], $[qty_owned]) RETURNING id;`;
    return db.one(sql, { user_id, ticker_symbol, stock_name, qty_owned });
}

//GET ALL STOCKS BY USER ID
StocksService.read = (user_id) => {
    const sql = `
      SELECT *       
      FROM stocks
      WHERE
        stocks.user_id = $[user_id];
      `;
    return db.any(sql, { user_id });
}


module.exports = { StocksService, };