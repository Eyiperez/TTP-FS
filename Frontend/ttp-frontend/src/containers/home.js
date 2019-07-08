import React from 'react';
import { withRouter } from 'react-router-dom';
import AuthContext from '../contexts/auth';
import UserNavs from '../components/userNavs';
import UserMeida from '../components/userMedia';

import '../styles/app.css';

import { Container, Row, Col } from 'reactstrap';

class Home extends React.Component {

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
                  <div style={{ textAlign: 'center' }}><h1>Welcome to YouStock!</h1></div>
                </Col>
              </Row>
              <Row>
                <Col>Buy stocks.</Col>
                <Col>Sell stocks.</Col>
                <Col>See all your transactions.</Col>
                <Col>Keep track of your profile value.</Col>
              </Row>
            </Container>
          } else {
            return <Container>
              <Row>
                <Col>
                  <div style={{ textAlign: 'center' }}><h1>Welcome to YouStock!</h1></div>
                </Col>
              </Row>
              <Row>
                <Col>Buy stocks.</Col>
                <Col>Sell stocks.</Col>
                <Col>See all your transactions.</Col>
                <Col>Keep track of your profile value.</Col>
              </Row>
            </Container>
          }
        }
      }
    </AuthContext.Consumer>
  }
}

export default withRouter(Home);
