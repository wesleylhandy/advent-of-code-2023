/**
 * Transforms string into array of numbers representing times in milliseconds
 * @param {string} line
 * @returns {number[]} times in ms
 *
 * @example
 * getTimesFromLine("Time:        46     85     75     82") // [46,85,75,82]
 */
function getTimesFromLine(line) {
    return splitLineIntoIntegers('Time:', line);
}

/**
 * Transforms string into array of numbers representing distances in millimeters
 * @param {string} line
 * @returns {number[]} distances in mm
 *
 * @example
 * getRecordDistancesFromLine("Distance:   208   1412   1257   1410") // [208,1412,1257,1410]
 */
function getRecordDistancesFromLine(line) {
    return splitLineIntoIntegers('Distance:', line);
}

/**
 * Strips title on a line and returns numerical data as an array
 * @param {string} title
 * @param {string} line
 * @returns {number[]}
 *
 * @example
 * splitLineIntoIntegers("Distance:", "Distance:   208   1412   1257   1410") // [208,1412,1257,1410]
 */
function splitLineIntoIntegers(title, line) {
    return line
        .replace(new RegExp(`(${title})\\s+`), '')
        .split(/\s+/)
        .map(v => Number.parseInt(v, 10));
}

module.exports.getRecordDistancesFromData = getRecordDistancesFromLine;
module.exports.getTimesFromLine = getTimesFromLine;
