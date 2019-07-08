import React from 'react';
import { withRouter } from 'react-router-dom';
import AuthContext from '../contexts/auth';
import UserNavs from '../components/userNavs';
import UserMeida from '../components/userMedia';
import axios from 'axios';

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
      newTicker: {},
      error: ''
    }
  }

  componentDidMount() {
    const user_id = this.props.match.params.user_id;
    const getStocksUrl = `http://localhost:3001/stocks/1`;
    axios.get(getStocksUrl)
      .then((data) => {
        const userData = data.data;
        const stocks = userData.stocks;
        const iexData = userData.iexData;
        this.setState({ userStocks: stocks, userIEXData: iexData })
      })
      .catch(err => {
        console.log(err);
      })
  }

  currentValue(stocksList) {
      const totalValue = 0;
      stocksList.map((stock,i) =>{
        console.log(stock)
      })
  }

  render() {

    return <AuthContext.Consumer>
      {
        (user) => {
          if (user) {
            return <Container className='container'>
              <UserMeida userEmail={user.email}></UserMeida>
              <UserNavs userEmail={user.email}></UserNavs>
              <Row>
                <Col>
                  <h1>Portfolio</h1>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h1>List</h1>
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
