const { isValidType } = require('./validators')

const isRequiredsNeededUser = body => {
    const requireds = [
        isValidType(body, 'name', 'string'),
        isValidType(body, 'email', 'string'),
        isValidType(body, 'user_uid', 'string'),
        isValidType(body, 'available_balance', 'string'),
    ];
    if (requireds.some(isValid => isValid === false)) {
        return true;
    }
    return false;
}

const isRequiredsNeededTransaction = body => {
    const requireds = [
        isValidType(body, 'user_id', 'string'),
        isValidType(body, 'ticker_symbol', 'string'),
        isValidType(body, 'price', 'string'),
        isValidType(body, 'qty', 'string'),
        isValidType(body, 'type', 'string'),
        isValidType(body, 'date', 'string'),
    ];
    if (requireds.some(isValid => isValid === false)) {
        return true;
    }
    return false;
}

const isRequiredsNeededStocks = body => {
    const requireds = [
        isValidType(body, 'user_id', 'string'),
        isValidType(body, 'ticker_symbol', 'string'),
        isValidType(body, 'qty_owned', 'string'),
    ];
    if (requireds.some(isValid => isValid === false)) {
        return true;
    }
    return false;
}

module.exports = { isRequiredsNeededUser, isRequiredsNeededTransaction, isRequiredsNeededStocks }