import React from 'react';

function List(props) {
    const stocks = props.displayList;
    console.log(stocks)

    return stocks.map((item, index) => {
        console.log('****',item)
        return <li className="list-group-item">{item}</li>
    })

}

export default List;
