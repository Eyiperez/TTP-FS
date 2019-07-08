const axios = require('axios');
const my_token = require('./iex_api_key');

const getTopsStocksData = (tickers) => {
    const token = my_token.key;
    console.log(token)
    const url = `https://cloud.iexapis.com/v1/tops?symbols=${tickers}&token=${token}`
    return axios.get(url)
}

const getOfficialPriceData = (tickers) => {
    const url = `https://ws-api.iextrading.com/1.0//deep/official-price?symbols=${tickers}`
    return axios.get(url)
}

module.exports = { getTopsStocksData, getOfficialPriceData };