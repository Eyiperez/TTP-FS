const express = require('express');
const stocksRouter = express.Router();
const { StocksService } = require('../services/stocks');

//VALIDATORS
const { isRequiredsNeededStocks } = require('../services/utils');


//POST- ADD STOCK
stocksRouter.post('/', (req, res, next) => {
    const { user_id, ticker_symbol, stock_name, qty_owned } = req.body;
    if (isRequiredsNeededStocks(req.body)) {
        res.status(400)
        res.send({
            "msg": "some required values are missing",
        })
    }
    StocksService.create(user_id, ticker_symbol, stock_name, qty_owned)
        .then(data => {
            res.status(200)
            res.json({ success: `Added stock for user ${user_id} with generated ID: ${data.id}`, id: data.id });
        })
        .catch(err => {
            res.status(400)
            next(err);
        })
});

//GET ALL STOCKS BY USER ID
stocksRouter.get('/:user_id', (req, res, next) => {
    const { user_id } = req.params;

    StocksService.read(user_id)
        .then(data => {
            res.status(200)
            res.json(data);
        })
        .catch(err => {
            res.status(400)
            res.send({ success: false })
        })
})


module.exports = { stocksRouter, };