function isWithinRange(sourceValue, start, range) {
    return start + range > sourceValue && sourceValue >= start;
}

function areRangesOverlapping(startA, rangeA, startB, rangeB) {
    return startA < startB + rangeB && startA + rangeA > startB;
}

function getOverlappingRange(startA, rangeA, startB, rangeB) {
    return bigIntMax(0, bigIntMin(startA + rangeA - 1n, startB + rangeB - 1n) - bigIntMax(startA, startB) + 1n);
}

function bigIntMax(...args) {
    return args.reduce((max, value) => (value > max ? value : max));
}
function bigIntMin(...args) {
    return args.reduce((min, value) => (value < min ? value : min));
}

module.exports.isWithinRange = isWithinRange;
module.exports.areRangesOverlapping = areRangesOverlapping;
module.exports.getOverlappingRange = getOverlappingRange;
module.exports.bigIntMax = bigIntMax;
module.exports.bigIntMin = bigIntMin;
