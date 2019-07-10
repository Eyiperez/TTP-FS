const express = require('express');
const stocksRouter = express.Router();
const { StocksService } = require('../services/stocks');

const { getTopsStocksData, getQuote } = require('../services/iex_api')

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
            res.send({ success: false, error: err });
        })
});

//GET ALL STOCKS BY USER ID FROM DB AND TOPS IEX
stocksRouter.get('/:user_id', (req, res, next) => {
    const { user_id } = req.params;
    let stocks = [];

    StocksService.read(user_id)
        .then(data => {
            stocks = data;
            let tickers = '';
            stocks.map((stock, i) => {
                if (stocks.length === 0) {
                    tickers = '?';
                };
                tickers = tickers + `${stock.ticker_symbol},`;
            })
            return getTopsStocksData(tickers)
        })
        .then((data) => {
            const iexData = data.data;
            res.status(200);
            res.json({ stocks, iexData });
        })
        .catch(err => {
            res.status(400)
            res.send({ success: false })
        })
})

//GET OFFICIAL OPEN PRICE BY TICKER SYMBOL
stocksRouter.get('/', (req, res, next) => {
    const { ticker } = req.query;
    getQuote(ticker)
        .then((data) => {
            const openPrice = data.data.open;
            res.status(200);
            res.json({ openPrice });
        })
        .catch(err => {
            console.log('error')
            res.status(400)
            res.send({ success: false })
        })
})

//GET QUOTE BY TICKER SYMBOL
stocksRouter.get('/:ticker/quote', (req, res, next) => {
    const { ticker } = req.params;
    getQuote(ticker)
        .then((data) => {
            if (data.data.symbol) {
                const quote = {
                    price: data.data.latestPrice,
                    name: data.data.companyName,
                }
                res.status(200);
                res.json({ success: true, quote });
            } else {
                res.status(200);
                res.json({ success: true, quote: null });
            }
        })
        .catch(err => {
            console.log('error')
            //res.status(400)
            res.json({ success: false })
        })
})

//UPDATE STOCK QTY 
stocksRouter.put('/:stock_id', (req, res, next) => {
    const { stock_id } = req.params;
    const { qty_owned } = req.body;

    StocksService.updateQty(stock_id, qty_owned)
        .then(() => {
            res.status(200)
            res.json({ success: `Updated qty owned of stock ID: ${stock_id}` });
        })
        .catch(err => {
            res.status(400)
            res.send({ success: false })
        })
})

//DELETE STOCK 
stocksRouter.delete('/:stock_id', (req, res, next) => {
    const { stock_id } = req.params;

    StocksService.delete(stock_id)
        .then(() => {
            res.status(200)
            res.json({ success: `Deleted stock with ID: ${stock_id}` });
        })
        .catch(err => {
            res.status(400)
            res.send({ success: false })
        })
})

module.exports = { stocksRouter, };