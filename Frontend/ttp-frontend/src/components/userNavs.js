import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import axios from 'axios';


class UserNavs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            user_id: null,
            page: '',
            error: ''
        }
    }

    componentDidMount() {
        const userEmail = this.props.userEmail;
        const currentPage = this.props.location.pathname;
        axios.get(`http://localhost:3001/user?email=${userEmail}`)
            .then((user) => {
                this.setState({ user_id: user.data.id, page: currentPage })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const { user_id, page } = this.state;
        const portfolioLink = `/portfolio/${user_id}`;
        const transactionsLink = `/transactions/${user_id}`;
        let portfolioClass = '';
        let transactionsClass = '';

        if (page === `/portfolio/${user_id}`) {
            portfolioClass = 'disabled';
        }
        if (page === `/transactions/${user_id}`) {
            transactionsClass = 'disabled';
        }
        return <div className='clearfix'>
            <Nav className='float-right'>
                <NavItem>
                    <NavLink className={portfolioClass} href={portfolioLink}>Portfolio</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={transactionsClass} href={transactionsLink}>Transactions</NavLink>
                </NavItem>
            </Nav>
        </div>
    }
}

export default withRouter(UserNavs);