import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { Container, Row, Col } from 'reactstrap';

import AuthContext from '../contexts/auth';

import UserMeida from '../components/userMedia';
import UserNavs from '../components/userNavs';
import Date from '../components/date';
import TransactionsList from '../components/transactionsList';

class Transactions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      user_id: '',
      boughtTrans: [],
      soldTrans: [],
      purchasedTotal: 0,
      displayBought: false,
      displaySold: false,
      error: ''
    }
  }

  componentDidMount() {
    const user_id = this.props.match.params.user_id;
    axios.get(`http://localhost:3001/user/${user_id}`)
      .then((data) => {
        this.setState({ user: data.data, user_id: user_id })
        return axios.get(`http://localhost:3001/transaction/type/${user_id}?type=bought`)
      })
      .then((data) => {
        this.setState({ boughtTrans: data.data })
        return axios.get(`http://localhost:3001/transaction/type/${user_id}?type=sold`)
      })
      .then((data) => {
        this.setState({ soldTrans: data.data })
      })
      .then(() => {
        this.soldTotal()
        this.purchasedTotal()
      })
      .catch((err) => {
        console.log('error', err)
      })
  }

  purchasedTotal = () => {
    const list = this.state.boughtTrans;
    let total = 0;
    list.map((item, i) => {
      const itemTotal = item.qty * item.price;
      return total = total + itemTotal
    })
    this.setState({ purchasedTotal: total })
  }

  soldTotal = () => {
    const list = this.state.soldTrans;
    let total = 0;
    list.map((item, i) => {
      const itemTotal = item.qty * item.price;
      return total = total + itemTotal
    })
    this.setState({ soldTotal: total })
  }

  seeBought = () => {
    this.setState({ displayBought: true, displaySold: false })
  }

  seeSold = () => {
    this.setState({ displayBought: false, displaySold: true })
  }

  render() {
    const { boughtTrans, soldTrans, soldTotal, purchasedTotal, displayBought, displaySold } = this.state;
    const displayBoughtList = displayBought === false ? <></> : <><h3>Bought</h3><TransactionsList list={boughtTrans}></TransactionsList></>
    const displaySoldList = displaySold === false ? <></> : <><h3>Sold</h3><TransactionsList list={soldTrans}></TransactionsList></>


    return (
      <> <AuthContext.Consumer>
        {
          (user) => {
            if (user) {
              return <Container className='container'>
                <UserMeida userEmail={user.email}></UserMeida>
                <UserNavs userEmail={user.email}></UserNavs>
                <Date></Date>
                <Row className='container'>
                  <Col>
                    <h1>Transactions</h1>
                  </Col>
                </Row>
                <Row className='container'>
                  <Col>
                    <h3>Purchased total: ${purchasedTotal} USD</h3>
                  </Col>
                  <Col>
                    <h3>Sold total: ${soldTotal} USD</h3>
                  </Col>
                </Row>
                <Row>
                  <button type="button" onClick={this.seeBought} className="btn btn-lg btn-block btn-outline-dark">See all bought transactions</button>
                  <button type="button" onClick={this.seeSold} className="btn btn-lg btn-block btn-outline-dark">See all sold transactions</button>
                </Row>
                <Row className='container'>
                  <Col style={{ textAlign: 'center' }}>
                    {displayBoughtList}
                    {displaySoldList}
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
      </>
    )
  }
}

export default withRouter(Transactions);