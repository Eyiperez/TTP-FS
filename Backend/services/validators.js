const isValidType = (obj, propertyName, propertyType) => {
    return typeof obj[propertyName] === propertyType
}


module.exports = {
    isValidType,
}
