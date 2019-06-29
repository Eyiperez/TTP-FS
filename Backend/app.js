const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

const {homeRouter,} = require('./routes/home')

app.use('/', homeRouter);


module.exports = {
    app,
};
