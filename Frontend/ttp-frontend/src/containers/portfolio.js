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
      quote:null,
      search: '',
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
        this.setState({ userInfo: user })
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
    this.setState({ [e.target.name]: e.target.value });
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
          this.setState({ error: 'Enter valid ticker symbol', search: '', quote: null});
        }
      })
  }


  render() {
    const { porfolioValue, openPrices, userStocks, userIEXData, userInfo, search, error, quote } = this.state;
    const displayError = error === '' ? '' : <div className="alert alert-danger" role="alert">{error}</div>
    const displayQuote = quote === null ? '' : <div className='container'><h5>Company name: {quote.name}</h5> <h5>Current price: ${quote.price}</h5>
    <button type="button" class="btn btn-secondary btn-sm">Buy</button> <button type="button" class="btn btn-secondary btn-sm">Clear</button></div>


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
                  <h3>Cash - ${userInfo.available_balance}</h3>
                  {displayError}
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
