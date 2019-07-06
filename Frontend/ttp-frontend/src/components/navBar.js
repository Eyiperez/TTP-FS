import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { NavBarLinks } from './navBarLinks';
import '../styles/NavBarLinks.css';
import NavsContext from '../contexts/Navs';


class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: '',
            location: this.props.location.pathname,
        }

    }
    componentDidMount = () => {
        const currentPage = this.props.location.pathname;
        if (currentPage === '/Login') {
            this.setState({ page: 'Login' })
        }
        if (currentPage === '/') {
            this.setState({ page: 'Home' })
        }
        if (currentPage === '/Signup') {
            this.setState({ page: 'Signup' })
        }
        if (currentPage === '/LogOut') {
            this.setState({ page: 'LogOut' })
        }
        if (currentPage !== '/Signup' && currentPage !== '/' && currentPage !== '/Login' && currentPage !== '/LogOut') {
            this.setState({ page: '' })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            const currentPage = this.props.location.pathname;
            if (currentPage === '/Login') {
                this.setState({ page: 'Login' })
            }
            if (currentPage === '/') {
                this.setState({ page: 'Home' })
            }
            if (currentPage === '/Signup') {
                this.setState({ page: 'Signup' })
            }
            if (currentPage === '/LogOut') {
                this.setState({ page: 'LogOut' })
            }
            if (currentPage !== '/Signup' && currentPage !== '/' && currentPage !== '/Login' && currentPage !== '/LogOut') {
                this.setState({ page: '' })
            }
        }
    }


    render() {

        return (
            <NavsContext.Provider value={this.state.page}>
                <nav className="body sticky-top my-nav navbar navbar-expand-lg navbar-light" style={{backgroundColor: 'white'}}>
                    <form className="navbar-nav">
                        <Link className="navbar-brand" to="/">YouStock</Link>
                        <NavBarLinks></NavBarLinks>
                    </form>
                </nav>

            </NavsContext.Provider>

        )
    }

}

export default withRouter(NavBar);