import React from 'react';
import axios from 'axios';


class UserMedia extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            name: '',
            user_photo: '',
            user_id: null,
            error: ''
        }
    }

    componentDidMount() {
        const userEmail = this.props.userEmail;
        axios.get(`http://localhost:3001/user?email=${userEmail}`)
            .then((user) => {
                this.setState({
                    user_id: user.data.id,
                    email: userEmail,
                    name: user.data.name,
                    user_photo: user.data.user_photo,
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const { user_id, user_photo, email, name } = this.state;

        return (
            <div style={{marginTop:'30px'}}>
                <div className="media">
                    <img src={user_photo} className="align-self-start mr-3" style={{borderRadius:'90%', height:'80px', width:'80px'}} alt="..." />
                    <div className="media-body">
                        <h5 className="mt-0">Hello {name}!</h5>
                    </div>
                </div>
            </div>
        )
    }
};


export default (UserMedia);