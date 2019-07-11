import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';

import AuthContext from '../contexts/auth';

import UserMeida from '../components/userMedia';
import UserNavs from '../components/userNavs';
import Date from '../components/date';

class Transactions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: ''
    }
  }

  componentDidMount() {
    const user_id = this.props.match.params.user_id;
    axios.get(`http://localhost:3001/user/${user_id}`)
      .then((data) => {
        console.log(data)
        return axios.get(`http://localhost:3001/transaction/type/${user_id}?type=bought`)
      })
      .then((data) => {
        console.log(data)
        return axios.get(`http://localhost:3001/transaction/type/${user_id}?type=sold`)
      })
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }


  render() {
    const { email, password, error } = this.state;

    return (
      <> <AuthContext.Consumer>
        {
          (user) => {
            if (user) {
              return <Container className='container'>
                <UserMeida userEmail={user.email}></UserMeida>
                <UserNavs userEmail={user.email}></UserNavs>
                <Date></Date>
                <Row>
                  <Col>
                    <h1>Transactions</h1>
                  </Col>
                </Row>
              </Container>
            } else {
              return <h1>Please login</h1>
            }
          }
        }
      </AuthContext.Consumer>
      </>
    )
  }
}

export default withRouter(Transactions);