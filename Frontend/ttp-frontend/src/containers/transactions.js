import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container } from 'reactstrap';
import axios from 'axios';

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
      <>
        <Container>
          <h1>Transactions</h1>

        </Container>
      </>
    )
  }
}

export default withRouter(Transactions);