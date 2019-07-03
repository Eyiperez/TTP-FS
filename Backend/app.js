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

//ROUTES
app.use('/', homeRouter);
app.use('/user', userRouter);


module.exports = {
    app,
};
