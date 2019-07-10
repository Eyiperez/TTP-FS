import React from 'react';
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';


const Search = (props) => {
    const value = props.value;

    return <div>
        <InputGroup>
            <Input placeholder="Ticker symbol" name={'search'} value={value} onChange={e => { props.onChange(e) }} />
            <InputGroupAddon addonType="append">
                <Button onClick={e => { props.onClick(value)}} color="secondary">Search</Button>
            </InputGroupAddon>
        </InputGroup>
    </div>


}

export default (Search);