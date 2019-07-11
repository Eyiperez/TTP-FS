import React from 'react';
import { ListGroup, ListGroupItem, Row, Col } from 'reactstrap';

import TransactionItem from './transactionItem';

export default class TransactionsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        const list = this.props.list;
        if (list === null) return <></>
        else if (list.length === 0) {
            return <h3>No Results Found...</h3>
        }
        else {
            return (
                <ListGroup flush>
                    <ListGroupItem >
                        <Row style={{ textAlign: 'center' }}>
                            <Col><h5>Ticker Symbol</h5></Col>
                            <Col><h5>Price</h5></Col>
                            <Col><h5>Number of Shares</h5></Col>
                            <Col><h5>Date</h5></Col>
                        </Row>
                    </ListGroupItem>
                    {
                        list.map((item, i) => {
                            return <TransactionItem key={i} item={item}></TransactionItem>
                        })
                    }
                </ListGroup>
            );
        }
    }
}

