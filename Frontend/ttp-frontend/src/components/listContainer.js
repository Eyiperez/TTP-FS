import React from 'react';
import PortfolioItem from '../components/portfolioItem';

function List(props) {
    const displayList = props.displayList

    return (
        <ul><PortfolioItem displayList={displayList}></PortfolioItem></ul>
    );
}

export default List;
