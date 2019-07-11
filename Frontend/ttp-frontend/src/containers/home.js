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
              <Row className='container' style={{ textAlign: 'center' }}>
                <Col><h5>Buy stocks.</h5><br></br><img className='homeImage' src="https://media.giphy.com/media/kbW22w3YCsUe1dTjnk/giphy.gif" alt='...'/></Col>
                <Col><h5>Sell stocks.</h5><br></br><img className='homeImage' src="https://media.giphy.com/media/KHQVKHjg9YGNO54si4/giphy.gif" alt='...'/></Col>
                <Col><h5>See all your transactions. Have your audit details ready.</h5><img className='homeImage' src="https://media.giphy.com/media/TK9TxBzUnV23WlH0w5/giphy.gif" alt='...'/></Col>
              </Row>
            </Container>
          } else {
            return <Container>
              <Row>
                <Col>
                  <div style={{ textAlign: 'center' }}><h1>Welcome to YouStock!</h1></div>
                </Col>
              </Row>
              <Row className='container' style={{ textAlign: 'center' }}>
                <Col><h5>Buy stocks.</h5><br></br><img className='homeImage' src="https://media.giphy.com/media/kbW22w3YCsUe1dTjnk/giphy.gif" alt='...'/></Col>
                <Col><h5>Sell stocks.</h5><br></br><img className='homeImage' src="https://media.giphy.com/media/KHQVKHjg9YGNO54si4/giphy.gif" alt='...'/></Col>
                <Col><h5>See all your transactions. Have your audit details ready.</h5><img className='homeImage' src="https://media.giphy.com/media/TK9TxBzUnV23WlH0w5/giphy.gif" alt='...'/></Col>
              </Row>
            </Container>
          }
        }
      }
    </AuthContext.Consumer>
  }
}

export default withRouter(Home);
