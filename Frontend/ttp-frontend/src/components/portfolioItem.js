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
                    <a style={{fontSize:'10px'}} target="_blank"  href='https://iextrading.com/developer/'>IEX Real Time Price</a>
                </Col>
                <Col>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={e => { props.onClick(item, currPrice)}}>Sell</button>
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
                    <a  style={{fontSize:'10px'}} target="_blank"  herf='https://iextrading.com/developer/'>IEX Real Time Price</a>
                </Col>
                <Col>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={e => { props.onClick(item, currPrice)}}>Sell</button>
                </Col>
            </Row> </li>
    }
}

export { ListItem };
