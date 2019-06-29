const express = require('express');
const homeRouter = express.Router();


homeRouter.get('', (req, res) => {
    res.send(`<h1>Web based stock profolio fullstack app.</h1> </br> 
    <h1>Where a stock is simply an asset that can be bought or sold at a price that continiously rises or falls throughout the day.</h1>`)
});


module.exports = {homeRouter,};