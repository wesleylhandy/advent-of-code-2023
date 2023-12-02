/**
 * Strips all non-numeric characters from a string and returns new string
 * @param {String} value
 * @returns {String} only numeric characters from original string
 */
function stripNonNumericsFromString(value) {
    if (typeof value !== 'string') {
        throw new TypeError('value must be of type `string`');
    }
    return value.replace(/[^0-9]/gi, '');
}

module.exports.stripNonNumericsFromString = stripNonNumericsFromString;
