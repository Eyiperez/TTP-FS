import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBarLinks.css'
import NavsContext from '../contexts/Navs';
import AuthContext from '../contexts/auth';


const NavBarLinks = () => {
    const links = ['Home', 'Login', 'Signup'];

    const userLoggedIn = <NavsContext.Consumer>
        {value =>

            ['Home', 'LogOut'].map((link, index) => {
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
                return <Link className={active} value={link} to={to} key={index}><div className={hover}>{linkName}</div></Link>
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
