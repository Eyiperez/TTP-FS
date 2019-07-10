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
      newStockQty: 1,
      error: ''
    }
  }

  componentDidMount() {
    const user_id = this.props.match.params.user_id;
    const getStocksUrl = `http://localhost:3001/stocks/1`;
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
          console.log('open prices', this.state.openPrices));
        return this.getUser(user_id)
      })
      .then((data) => {
        console.log('data', data)
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

  getUser(user_id) {
    return axios.get(`http://localhost:3001/user/${user_id}`)
  }

  portfolioValue(stocksList) {
    let totalValue = 0;
    stocksList.map((stock, i) => {
      totalValue = totalValue + stock.lastSalePrice;
    })
    this.setState({ porfolioValue: totalValue.toFixed(2) });
  }

  getOfficiaPrices() {
    const officialPrices = [];
    const stocks = this.state.userStocks;
    stocks.map((stock, index) => {
      const ticker = stock.ticker_symbol;
      axios.get(`http://localhost:3001/stocks/?ticker=${ticker}`)
        .then((data) => {
          const openPrice = data.data.openPrice;
          officialPrices.push(openPrice)
        })
    })
    this.setState({ openPrice: officialPrices })
    return officialPrices;
  }

  handleChange = (e) => {
    console.log(e.target.value)
    this.setState({ [e.target.name]: e.target.value, success: '', error: '' });
  }

  handleSearchClick = (query) => {
    const url = `http://localhost:3001/stocks/${query}/quote`
    axios.get(url)
      .then((data) => {
        if (data.data.success === true) {
          const quote = data.data.quote;
          console.log(quote)
          this.setState({ error: '', quote });
        } else {
          this.setState({ error: 'Enter valid ticker symbol', search: '', quote: null });
        }
      })
  }

  addTransaction = () => {
    const newTran = {
      user_id: this.props.match.params.user_id,
      ticker_symbol: this.state.quote.ticker,
      price: this.state.quote.price,
      qty: parseInt(this.state.newStockQty),
      type: 'bought',
      date: document.getElementById('date').innerText
    }
    console.log("buy!!!!!!!", newTran)
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
    this.setState({ quote: null, search: '' })
  }

  handleBuy = () => {
    if (this.state.newStockQty % 1 != 0) {
      this.setState({ error: 'Please enter whole number for quantity.' })
    } else {
      const purchaseTotal = this.state.quote.price * parseInt(this.state.newStockQty);
      if (this.state.availableCash < purchaseTotal) {
        this.setState({ error: 'No sufficients funds' })
      } else {
        this.addTransaction()
        this.updateAvailableCash(purchaseTotal.toFixed(2))
        this.setState({ error: '', search: '', success: `Successful purchase of ${this.state.quote.name} stock!` })
      }
    }
  }


  render() {
    const { porfolioValue, openPrices, userStocks, userIEXData, search, error, quote, availableCash, newStockQty, success } = this.state;
    const displayError = error === '' ? '' : <div className="alert alert-danger" role="alert">{error}</div>
    const displaySuccess = success === '' ? '' : <div className="alert alert-success" role="alert">{success}</div>
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
                    <List officialPrices={openPrices} userStocks={userStocks} userIEXData={userIEXData}></List>
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
            return <h1>Please login</h1>
          }
        }
      }
    </AuthContext.Consumer>
  }
}

export default withRouter(Portfolio);
