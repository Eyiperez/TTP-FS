import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import '../styles/NavBarLinks.css'
import NavsContext from '../contexts/Navs';
import AuthContext from '../contexts/auth';


const NavBarLinks = (props) => {
    const links = ['Home', 'Login', 'Signup'];

    const userLoggedIn = <NavsContext.Consumer>
        {value =>

            ['Home'].map((link, index) => {
                let active = 'nav-item nav-link';
                let hover = 'gradientText';
                let to = `/${link}`;
                let linkName = link
                if (link === 'Home') {
                    to = `/`;
                }
                if (value === link) {
                    active = 'nav-item nav-link active';
                    hover = '';
                }
                return <><Link className={active} value={link} to={to} key={index}><div className={hover}>{linkName}</div></Link>
                    <Button style={{ backgroundColor: 'rgb(21, 238, 39)', borderColor: 'rgb(21, 238, 39)' }} size="sm" onClick={e => { props.logOut() }}>Log Out</Button>{' '}</>
            })
        }
    </NavsContext.Consumer>;

    const userLoggedOut = <NavsContext.Consumer>
        {value =>

            links.map((link, index) => {
                let active = 'nav-item nav-link';
                let hover = 'gradientText';
                let to = `/${link}`;
                let linkName = link
                if (link === 'Home') {
                    to = `/`;
                }
                if (value === link) {
                    active = 'nav-item nav-link active';
                    hover = '';
                }
                if (link === 'Login' || link === 'Signup') {
                    linkName = link
                }
                if (value === 'Login' && value === link) {
                    linkName = ''

                }
                if (value === 'Signup' && value === link) {
                    linkName = ''

                }
                return <Link className={active} value={link} to={to} key={index}><div className={hover}>{linkName}</div></Link>
            })
        }
    </NavsContext.Consumer>;

    return <AuthContext.Consumer>
        {user => {
            if (user) {
                return userLoggedIn
            } else {
                return userLoggedOut
            }
        }}

    </AuthContext.Consumer>
}

export { NavBarLinks }
