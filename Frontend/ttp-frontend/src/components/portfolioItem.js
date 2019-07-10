import React from 'react';
import { Row, Col } from 'reactstrap';

const ListItem = (props) => {
    const item = props.item;
    const index = props.index;
    const prices = props.prices;
    const userIEXData = props.userIEXData;
    const currPrice = userIEXData[index].lastSalePrice;
    let textColor = 'gray';

    if (prices) {
        const openPrice = prices[index]
        if (currPrice > openPrice) {
            textColor = 'green'
        }
        if (currPrice < openPrice) {
            textColor = 'red'
        }
        return <li className="list-group-item">
            <Row>
                <Col>
                    <h5>{item.ticker_symbol}</h5>
                </Col>
                <Col>
                    <h5>{item.qty_owned} Shares</h5>
                </Col>
                <Col>
                    <h5 style={{ color: textColor }}>${currPrice}</h5>
                </Col>
            </Row> </li>
    } else {
        return <li className="list-group-item">
            <Row>
                <Col>
                    <h5>{item.ticker_symbol}</h5>
                </Col>
                <Col>
                    <h5>{item.qty_owned} shares.</h5>
                </Col>
                <Col>
                    <h5 style={{ color: "textColor" }}>${currPrice}</h5>
                </Col>
            </Row> </li>
    }
}

export { ListItem };
