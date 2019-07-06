const { db } = require('./pgp');
const StocksService = {};

//ADD STOCK
StocksService.create = (user_id, ticker_symbol, stock_name, qty_owned) => {
    const sql = `INSERT INTO stocks (user_id, ticker_symbol, stock_name, qty_owned) VALUES ($[user_id], $[ticker_symbol], $[stock_name], $[qty_owned]) RETURNING id;`;
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

//UPDATE STOCK QTY
StocksService.updateQty = (stock_id, qty_owned) => {
    const sql = `
      UPDATE stocks
      SET
        qty_owned=$[qty_owned]
      WHERE
        id=$[stock_id]
      `;
    return db.none(sql, { stock_id, qty_owned });
}

//DELETE STOCK
StocksService.delete = (stock_id) => {
    const sql = `
      DELETE 
      FROM
        stocks
      WHERE
        id=$[stock_id]
      `;
    return db.none(sql, { stock_id });
}

module.exports = { StocksService, };