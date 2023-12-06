/**
 * Sorts BigInt is ascending order
 * @param {bigint} a
 * @param {bigint} b
 * @returns {boolean}
 */
function sortBigIntAscending(a, b) {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}

module.exports.sortBigIntAscending = sortBigIntAscending;
