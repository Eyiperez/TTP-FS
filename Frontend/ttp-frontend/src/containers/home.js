import React from 'react';
import { withRouter } from 'react-router-dom';
import AuthContext from '../contexts/auth';


class Home extends React.Component {
 
  render() {

   return <AuthContext.Consumer>
      {
        (user) => {
          if (user) {
            return <h1>User logged in {user.email}</h1>
          } else {
            return <h2> Not logged in </h2>
          }
        }
      }
    </AuthContext.Consumer>
  }
}

export default withRouter(Home);
