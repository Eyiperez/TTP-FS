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

module.exports = { isRequiredsNeededUser, }