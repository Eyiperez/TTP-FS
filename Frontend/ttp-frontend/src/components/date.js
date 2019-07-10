import React from 'react';
import Moment from 'react-moment';

export default class Date extends React.Component {

    render() {
        const date = new Date();

        return (
            <>
                <div style={{ margin: "30px" }} >
                    <div className='row'>
                        <div className="col">
                            <h5>Today <Moment format="MMMM DD, YYYY" id="date">{date}</Moment></h5>
                        </div>
                    </div>
                </div>
            </>

        )
    }
}