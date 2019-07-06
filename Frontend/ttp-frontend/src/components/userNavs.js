import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import axios from 'axios';


class UserNavs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            user_id: null,
            error: ''
        }
    }

    componentDidMount() {
        const userEmail = this.props.userEmail;
        axios.get(`http://localhost:3001/user?email=${userEmail}`)
            .then((user) => {
                this.setState({ user_id: user.data.id })
            })
            .catch(err => {
                console.log(err);
            })
    }


    render() {
        const { user_id } = this.state;
        const profileLink = `/profile/${user_id}`;
        const transactionsLink = `/transactions/${user_id}`;

        return (
            <>
                <div>
                    <Nav>
                        <NavItem>
                            <NavLink href={profileLink}>Profile</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href={transactionsLink}>Transactions</NavLink>
                        </NavItem>
                    </Nav>
                </div>
            </>
        )

    }
};


export default (UserNavs);