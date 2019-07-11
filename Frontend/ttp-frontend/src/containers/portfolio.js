import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import AuthContext from '../contexts/auth';

import { List } from '../components/listContainer';
import UserNavs from '../components/userNavs';
import UserMeida from '../components/userMedia';
import Date from '../components/date';
import Search from '../components/search';

import '../styles/app.css';
import { Container, Row, Col } from 'reactstrap';

class Portfolio extends React.Component {
  constructor() {
    super()
    this.state = {
      userInfo: {},
      userStocks: [],
      userIEXData: [],
      currentValue: 0,
      availableCash: 0,
      tickerName: '',
      porfolioValue: 0,
      newTicker: {},
      openPrices: null,
      displayList: [],
      displayQuote: false,
      quote: null,
      search: '',
      success: '',
      stock_id: null,
      stockExist: false,
      newStockQty: 1,
      reload: false,
      message: '',
      selling: false,
      error: ''
    }
  }

  componentDidMount() {
    const user_id = this.props.match.params.user_id;
    const getStocksUrl = `http://localhost:3001/stocks/${user_id}`;
    let userData = [];
    let stocks = [];
    let iexData = [];
    axios.get(getStocksUrl)
      .then((data) => {
        if (data.data.stocks.length === 0) {
          return iexData
        }
        userData = data.data;
        stocks = userData.stocks;
        iexData = userData.iexData;
        this.setState({ userStocks: stocks, userIEXData: iexData })
        return iexData
      })
      .then((iexData) => {
        if (iexData.length === 0) {
          return iexData
        } else {
          this.portfolioValue(iexData)
        }
      })
      .then(() => {
        this.setState({ openPrices: this.getOfficiaPrices() },
          console.log('open prices'));
        return this.getUser(user_id)
      })
      .then((data) => {
        const user = data.data;
        this.setState({ userInfo: user, availableCash: user.available_balance })
      })
      .then(() => {
        console.log('done')
      })
      .catch(err => {
        console.log(err);
      })
  }

  componentDidUpdate() {
    if (this.state.reload === true) {
      const user_id = this.props.match.params.user_id;
      const getStocksUrl = `http://localhost:3001/stocks/${user_id}`;
      let userData = [];
      let stocks = [];
      let iexData = [];
      axios.get(getStocksUrl)
        .then((data) => {
          userData = data.data;
          stocks = userData.stocks;
          iexData = userData.iexData;
          this.setState({ userStocks: stocks, userIEXData: iexData })
          return iexData
        })
        .then((iexData) => {
          this.portfolioValue(iexData)
        })
        .then(() => {
          this.setState({ openPrices: this.getOfficiaPrices() },
            console.log('open prices'));
          return this.getUser(user_id)
        })
        .then((data) => {
          const user = data.data;
          this.setState({ userInfo: user, availableCash: user.available_balance, reload: false })
        })
        .then(() => {
          console.log('done')
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  getUser(user_id) {
    return axios.get(`http://localhost:3001/user/${user_id}`)
  }

  portfolioValue(stocksList) {
    let totalValue = 0;
    stocksList.map((stock, i) => {
      const qty = this.state.userStocks[i].qty_owned;
      const stockVal = stock.lastSalePrice * qty
      return totalValue = totalValue + stockVal;
    })
    this.setState({ porfolioValue: totalValue.toFixed(2) });
  }

  getOfficiaPrices() {
    const officialPrices = [];
    const stocks = this.state.userStocks;
    stocks.map((stock, index) => {
      const ticker = stock.ticker_symbol;
      return axios.get(`http://localhost:3001/stocks/?ticker=${ticker}`)
        .then((data) => {
          const openPrice = data.data.openPrice;
          officialPrices.push(openPrice)
        })
    })
    this.setState({ openPrice: officialPrices })
    return officialPrices;
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, success: '', error: '' });
  }

  handleSearchClick = (query) => {
    const url = `http://localhost:3001/stocks/${query}/quote`
    axios.get(url)
      .then((data) => {
        if (data.data.success === true) {
          const quote = data.data.quote;
          this.setState({ error: '', quote });
        } else {
          this.setState({ error: 'Enter valid ticker symbol', search: '', quote: null });
        }
      })
  }

  addBoughtTransaction = () => {
    const newTran = {
      user_id: this.props.match.params.user_id,
      ticker_symbol: this.state.quote.ticker,
      price: this.state.quote.price,
      qty: parseInt(this.state.newStockQty),
      type: 'bought',
      date: document.getElementById('date').innerText
    }
    axios.post('http://localhost:3001/transaction', newTran)
  }

  addSoldTransaction = (stock, currPrice) => {
    const newTran = {
      user_id: this.props.match.params.user_id,
      ticker_symbol: stock.ticker_symbol,
      price: currPrice,
      qty: parseInt(stock.qty_owned),
      type: 'sold',
      date: document.getElementById('date').innerText
    }
    axios.post('http://localhost:3001/transaction', newTran)
  }

  updateAvailableCash = (purchaseTotal) => {
    const user_id = this.props.match.params.user_id;
    const availableCash = this.state.availableCash.toFixed(2);
    const newAvailableCash = availableCash - purchaseTotal;
    axios.put(`http://localhost:3001/user/${user_id}`, { available_balance: newAvailableCash.toFixed(2) })
    this.setState({ availableCash: newAvailableCash })
  }

  clearQuote = () => {
    this.setState({ quote: null, search: '', error: '', success: '' })
  }

  handleBuy = () => {
    if (this.state.newStockQty % 1 !== 0) {
      this.setState({ error: 'Please enter whole number for quantity.' })
    } else {
      const purchaseTotal = this.state.quote.price * parseInt(this.state.newStockQty);
      if (this.state.availableCash < purchaseTotal) {
        this.setState({ error: 'No sufficients funds' })
      } else {
        this.addBoughtTransaction()
        this.updateAvailableCash(purchaseTotal.toFixed(2))
        this.addStock(this.state.quote.ticker)
        this.setState({ error: '', search: '', success: `Successful purchase of ${this.state.quote.name} stock!`, reload: true })
      }
    }
  }

  inStocks(ticker) {
    const currStocks = this.state.userStocks;
    for (let i = 0; i < currStocks.length; i++) {
      if (currStocks[i].ticker_symbol === ticker) {
        return currStocks[i]
      }
    }
  }

  addStock = (ticker) => {
    const user_id = this.props.match.params.user_id;
    const newStock = {
      user_id: user_id,
      ticker_symbol: this.state.quote.ticker,
      stock_name: this.state.quote.name,
      qty_owned: parseInt(this.state.newStockQty),
    };
    if (this.inStocks(ticker)) {
      const currQty = this.inStocks(ticker).qty_owned;
      const newQty = parseInt(this.state.newStockQty) + parseInt(currQty);
      const stock_id = this.inStocks(ticker).id;
      const body = { qty_owned: newQty }
      return axios.put(`http://localhost:3001/stocks/${stock_id}`, body)
    }
    else {
      return axios.post('http://localhost:3001/stocks', newStock)
    }
  }

  sellStock = (stock, currPrice) => {
    const user_id = this.props.match.params.user_id;
    if (this.state.selling === false) {
      this.setState({ message: `You are about to sell your stocks for ${stock.stock_name} with ticker symbol ${stock.ticker_symbol}. To continue click sell again. To cancel click `, selling: true, success: '', error: '' })
    } else if (this.state.selling === true) {
      axios.delete(`http://localhost:3001/stocks/${stock.id}`)
        .then(() => {
          console.log(stock)
          this.addSoldTransaction(stock, currPrice)
        })
        .then(() => {
          const qty = stock.qty_owned;
          const totalSold = qty * currPrice;
          const newBalance = this.state.availableCash + totalSold;
          return newBalance
        })
        .then((newBalance) => {
          return axios.put(`http://localhost:3001/user/${user_id}`, { available_balance: newBalance.toFixed(2) })
        })
        .then(() => {
          this.setState({ message: '', reload: true, selling: false, error: '', success: '' })
        })
    }
  }

  cancelSell = () => {
    this.setState({ message: '', selling: false, error: '', success: '' })
  }

  render() {
    const { porfolioValue, openPrices, userStocks, userIEXData, search, error, quote, availableCash, newStockQty, success, message } = this.state;
    const displayError = error === '' ? '' : <div className="alert alert-danger" role="alert">{error}</div>
    const displaySuccess = success === '' ? '' : <div className="alert alert-success" role="alert">{success}</div>
    const displayMessage = message === '' ? '' : <div className="alert alert-primary" role="alert">{message}  <button type="button" className="btn btn-outline-dark sm" onClick={this.cancelSell}><span>Cancel</span></button></div>
    const displayQuote = quote === null ? '' : <div className='container'><h5>Company name: {quote.name}</h5> <h5>Current price: ${quote.price}</h5>
      <div className="input-group input-group-sm mb-3" style={{ width: '100px' }}>
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-sm">Qty.</span>
        </div>
        <input type="text" onChange={this.handleChange} name='newStockQty' value={newStockQty} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
      </div>
      <button type="button" onClick={this.handleBuy} className="btn btn-secondary btn-sm">Buy</button> <button type="button" onClick={this.clearQuote} className="btn btn-secondary btn-sm">Clear</button></div>


    return <AuthContext.Consumer>
      {
        (user) => {
          if (user) {
            return <Container className='container'>
              <UserMeida userEmail={user.email}></UserMeida>
              <UserNavs userEmail={user.email}></UserNavs>
              <Date></Date>
              <Row>
                <Col>
                  <h1>Portfolio (${porfolioValue})</h1>
                </Col>
              </Row>
              <Row className='container'>
                <Col>
                  <ul className="list-group list-group-flush">
                    {displayMessage}
                    <List officialPrices={openPrices} userStocks={userStocks} userIEXData={userIEXData} onClick={this.sellStock}></List>
                  </ul>
                </Col>
                <Col>
                  <h3>Cash - ${availableCash}</h3>
                  {displayError}
                  {displaySuccess}
                  <Search onChange={this.handleChange} value={search} onClick={this.handleSearchClick}></Search>
                  {displayQuote}
                </Col>
              </Row>
            </Container>
          } else {
            return <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          }
        }
      }
    </AuthContext.Consumer>
  }
}

export default withRouter(Portfolio);