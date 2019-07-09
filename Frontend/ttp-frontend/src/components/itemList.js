import React from 'react';

function Item(props) {
    const item = props.item;
    console.log(item)

    return <><li className="list-group-item">{item}</li>
    <li className="list-group-item">{item}</li>
    <li className="list-group-item">{item}</li></>
}

export default Item;
