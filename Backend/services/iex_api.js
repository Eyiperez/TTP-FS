const axios = require('axios');

const getTopsStocksData = (tickers) => {
    const url = `https://ws-api.iextrading.com/1.0/tops?symbols=${tickers}`
    return axios.get(url)
}

const getOfficialPriceData = (tickers) => {
    const url = `https://ws-api.iextrading.com/1.0//deep/official-price?symbols=${tickers}`
    return axios.get(url)
}

module.exports = { getTopsStocksData, getOfficialPriceData };