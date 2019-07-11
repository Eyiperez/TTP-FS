import React from 'react';
import { ListGroupItem, Row, Col } from 'reactstrap';

export default class TransactionItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
      }
  render() {
      const item = this.props.item;
    return (
        <ListGroupItem >
            <Row style={{textAlign:'center'}}>
                <Col>{item.ticker_symbol}</Col>
                <Col>{item.price}</Col>
                <Col>{item.qty}</Col>
                <Col>{item.date}</Col>
            </Row>
        </ListGroupItem>
    );
  }
}