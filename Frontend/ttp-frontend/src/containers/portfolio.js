import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import AuthContext from '../contexts/auth';

import List from '../components/listContainer';
import UserNavs from '../components/userNavs';
import UserMeida from '../components/userMedia';


import '../styles/app.css';
import { Container, Row, Col } from 'reactstrap';

class Portfolio extends React.Component {
  constructor() {
    super()
    this.state = {
      userStocks: [],
      userIEXData: [],
      currentValue: 0,
      availableCash: 0,
      tickerName: '',
      porfolioValue: 0,
      newTicker: {},
      officialPrices:[],
      displayList: [],
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
        this.setState({officialPrices: this.getOfficiaPrices() });
      })
      .catch(err => {
        console.log(err);
      })
  }

  portfolioValue(stocksList) {
    let totalValue = 0;
    stocksList.map((stock, i) => {
      totalValue = totalValue + stock.lastSalePrice;
    })
    this.setState({ porfolioValue: totalValue });
  }

  getOfficiaPrices() {
    const officialPrices = [];
    const stocks = this.state.userStocks;
    stocks.map((stock, index) => {
      const ticker = stock.ticker_symbol;
      axios.get(`http://localhost:3001/stocks/?ticker=${ticker}`)
        .then((data) => {
          console.log(data.data)
          const openPrice = data.data.openPrice;
          officialPrices.push(openPrice)
        })
    })
    console.log(officialPrices)
    return officialPrices;
  }

     

  render() {
    const { porfolioValue, officialPrices } = this.state;

    return <AuthContext.Consumer>
      {
        (user) => {
          if (user) {
            return <Container className='container'>
              <UserMeida userEmail={user.email}></UserMeida>
              <UserNavs userEmail={user.email}></UserNavs>
              <Row>
                <Col>
                  <h1>Portfolio (${porfolioValue})</h1>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h1>List</h1>
                  <List displayList={officialPrices}></List>
                </Col>
                <Col>
                  <h1>Cash</h1>
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
