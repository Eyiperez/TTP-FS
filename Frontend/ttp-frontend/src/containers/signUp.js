import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import firebase from '../firebase';
import axios from 'axios';

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'Register',
      email: '',
      name: '',
      imageURL: '',
      error: '',
      newUser: {},
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const newUser = {
          name: this.state.name,
          email: this.state.email,
          user_uid: response.user.uid,
          user_photo: this.state.imageURL,
          available_balance: 5000
        }
        return newUser;
      })
      .then((newUser) => {
        return axios.post('http://localhost:3001/user/', newUser)
      })
      .then((res) => {
        this.props.history.push(`/Profile/${res.data.id}`)
      })
      .catch(err => {
        const { message } = err;
        this.setState({ error: message });
      })
  }


  handleFileInput = async (e) => {
    const firstFile = e.target.files[0];

    const root = firebase.storage().ref()
    const newImage = root.child(firstFile.name);

    try {
      const snapshot = await newImage.put(firstFile);
      const url = await snapshot.ref.getDownloadURL();
      this.setState({ imageURL: url })
    }
    catch (err) {
      console.log(err);
    }

  }

  goToLogin = () => {
    this.props.history.push(`/Login`)
  }

  render() {
    const { email, password, name, error } = this.state;
    const displayError = error === '' ? '' : <div className="alert alert-danger" role="alert">{error}</div>

    return (
      <Container style={{ marginTop: '80px' }}>
        <div>
          <h1>Sign Up!</h1>
          {displayError}
        </div>
        <Container style={{ marginTop: '40px' }}>
          <Form>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input type="email" name="email" id="exampleEmail" placeholder="email" value={email} onChange={this.handleChange} />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input type="password" name="password" id="examplePassword" placeholder="password" value={password} onChange={this.handleChange} />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="exampleName">Name</Label>
              <Input type="text" name="name" id="exampleName" placeholder="John" value={name} onChange={this.handleChange} />
            </FormGroup>
            <FormGroup row>
              <Label for="exampleFile" sm={2}>Your Image</Label>
              <Col sm={10}>
                <Input type="file" name="file" id="exampleFile" onChange={this.handleFileInput} />
                <FormText color="muted">
                  This image will be displayed as your user profile picture.
                                </FormText>
              </Col>
            </FormGroup>
            <Button onClick={this.handleSubmit} style={{ backgroundColor: 'rgb(21, 238, 39)', borderColor: 'rgb(21, 238, 39)', color: 'white' }}>Sign Up</Button>
            <Button onClick={this.goToLogin} style={{ backgroundColor: 'white', borderColor: 'rgb(21, 238, 39)', marginLeft: '20px', color: 'black' }}>Already a user</Button>
          </Form>
        </Container>
      </Container>
    )
  }
}

export default withRouter(SignUp);