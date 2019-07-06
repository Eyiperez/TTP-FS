const express = require('express');
const transactionRouter = express.Router();
const { TransactionService } = require('../services/transaction');

//VALIDATORS
const { isRequiredsNeededTransaction } = require('../services/utils');


//POST- CREATE TRANSACTION
transactionRouter.post('/', (req, res, next) => {
    const { user_id, ticker_symbol, price, qty, type, date } = req.body;
    if (isRequiredsNeededTransaction(req.body)) {
        res.status(400)
        res.send({
            "msg": "some required values are missing",
        })
    }
    TransactionService.create(user_id, ticker_symbol, price, qty, type, date)
        .then(data => {
            res.status(200)
            res.json({ success: `Created transaction record for user ${user_id} with generated ID: ${data.id}`, id: data.id });
        })
        .catch(err => {
            res.status(400)
            next(err);
        })
});

//GET ALL TRANSACTIONS BY USER ID
transactionRouter.get('/:user_id', (req, res, next) => {
    const { user_id } = req.params;

    TransactionService.read(user_id)
        .then(data => {
            res.status(200)
            res.json(data);
        })
        .catch(err => {
            res.status(400)
            res.send({ success: false })
        })
})

//GET TRANSACTIONS BY USER ID AND TYPE
transactionRouter.get('/type/:user_id', (req, res, next) => {
    const { user_id } = req.params;
    const { type } = req.query;

    TransactionService.readByType(user_id, type)
        .then(data => {
            res.status(200)
            res.json(data);
        })
        .catch(err => {
            res.status(400)
            res.send({ success: false })
        })
})


module.exports = { transactionRouter, };