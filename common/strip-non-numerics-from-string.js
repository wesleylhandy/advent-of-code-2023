function stripNonNumericsFromString(value) {
    if (typeof value !== 'string') {
        throw new TypeError('value must be of type `string`');
    }
    return value.replace(/[^0-9]/gi, '');
}

module.exports.stripNonNumericsFromString = stripNonNumericsFromString;
