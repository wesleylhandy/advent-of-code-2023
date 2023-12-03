/**
 * @typedef {string|number} NumberLike
 */

/**
 * Curries array reducer function calculate sum
 * @param {NumberLike[]} array
 * @returns {number} sum of values in array
 */
function reduceToSum(array) {
    return array.reduce(sumNumberLikeReducer, 0);
}

/**
 * Curries array reducer function calculate product
 * @param {NumberLike[]} array
 * @returns {number} sum of values in array
 */
function reduceToProduct(array) {
    return array.reduce(multiplyNumberLikeReducer, 1);
}

/**
 * Adds a number to a NumberLike
 * @param {number} sum - initial sum
 * @param {NumberLike} value - value to add
 * @returns {number} new sum
 */
function sumNumberLikeReducer(sum, value) {
    return sum + Number.parseInt(value, 10);
}

function multiplyNumberLikeReducer(product, value) {
    return product * Number.parseInt(value, 10);
}

module.exports.reduceToSum = reduceToSum;
module.exports.reduceToProduct = reduceToProduct;
