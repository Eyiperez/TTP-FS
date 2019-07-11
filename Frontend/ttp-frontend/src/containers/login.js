import React from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../firebase';
import { Container } from 'reactstrap';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'Login',
      email: '',
      password: '',
      error: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log('Returns: ', response);
      })
      .then(() => {
        const userEmail = this.state.email
        return axios.get(`http://localhost:3001/user?email=${userEmail}`)
      })
      .then((user) => {
        this.props.history.push(`/portfolio/${user.data.id}`)
      })
      .catch(err => {
        const { message } = err;
        this.setState({ error: message });
      })
  }

  goToSignup = () => {
    this.props.history.push(`/Signup`)
  }

  render() {
    const { email, password, error } = this.state;
    const displayError = error === '' ? '' : <div className="alert alert-danger" role="alert">{error}</div>

    return (
      <>
        <Container style={{ marginTop: '60px', height: '300px' }}>
          <h1>Login</h1>
          {displayError}
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={email} onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" placeholder="Password" value={password} name="password" onChange={this.handleChange} />
            </div>
            <button type="submit" className="btn " onClick={this.handleSubmit} style={{ backgroundColor: 'rgb(21, 238, 39)', borderColor: 'rgb(21, 238, 39)', color: 'white' }}>Login</button>
            <button type="button" className="btn " onClick={this.goToSignup} style={{ borderColor: 'rgb(21, 238, 39)', marginLeft: '20px' }}>Sign Up</button>
          </form>
        </Container>
      </>
    )
  }
}

export default withRouter(Login);