import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import firebase from './firebase';

//PAGES
import NavBar from './components/navBar';
import Home from './containers/home';
import Login from './containers/login';
import Signup from './containers/signUp';
import Profile from './containers/profile';
import Transactions from './containers/transactions';

//CONTEXTS
import AuthContext from './contexts/auth';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  state = {
    user: null
  }
  
  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
      else {
        this.setState({ user: null })
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <AuthContext.Provider value={this.state.user}>
            <NavBar></NavBar>
            <Route path='/' exact component={Home} />
            <Route path='/Login' exact component={Login} />
            <Route path='/Signup' exact component={Signup} />
            <Route path='/Profile/:user_id' exact component={Profile} />
            <Route path='/Transactions/:user_id' exact component={Transactions} />
          </AuthContext.Provider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
