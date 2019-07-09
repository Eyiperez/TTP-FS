const axios = require('axios');
const my_token = require('./iex_api_key');

const getTopsStocksData = (tickers) => {
    const token = my_token.key;
    const url = `https://cloud.iexapis.com/v1/tops?symbols=${tickers}&token=${token}`
    return axios.get(url)
}

const getOfficialPriceData = (ticker) => {
    const token = my_token.key;
    const url = `https://cloud.iexapis.com/v1/stock/${ticker}/quote/?token=${token}`
    return axios.get(url)
}


module.exports = { getTopsStocksData, getOfficialPriceData };