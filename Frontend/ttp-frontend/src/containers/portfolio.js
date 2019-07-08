import React from 'react';
import { withRouter } from 'react-router-dom';
import AuthContext from '../contexts/auth';
import UserNavs from '../components/userNavs';
import UserMeida from '../components/userMedia';

import '../styles/app.css';

import { Container, Row, Col } from 'reactstrap';

class Portfolio extends React.Component {

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
