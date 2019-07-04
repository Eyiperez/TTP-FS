const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

//ROUTERS
const {homeRouter,} = require('./routes/home');
const {userRouter,} = require('./routes/user');
const {transactionRouter,} = require('./routes/transaction');

//ROUTES
app.use('/', homeRouter);
app.use('/user', userRouter);
app.use('/transaction', transactionRouter);


module.exports = {
    app,
};
