import React from 'react';
import {ListItem} from '../components/portfolioItem';

const List = (props) => {
    const prices = props.officialPrices;
    const userStocks= props.userStocks;
    const userIEXData = props.userIEXData;
    console.log('####', userStocks)

    if (userStocks === null) return <></>
    else if (userStocks.length === 0) {
        return <h3>No Results Found...</h3>
    }
    else {
        return userStocks.map((item, index) => {
            console.log('****', item)
            return <ListItem key={index} item={item} index={index} prices={prices} userIEXData={userIEXData} className="list-group-item"></ListItem>
        })
    }
}

export {List};
