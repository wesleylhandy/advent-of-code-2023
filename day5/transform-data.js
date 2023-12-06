const { Almanac } = require('./almanac-map');

/**
 * Get Seeds from line of text
 * @param {string} line
 * @returns {bigint[]}
 */
function getSeedsFromLine(line) {
    const stripped = line.replace('seeds:', '').trim();
    return mapToBigIntArray(stripped);
}

/**
 * Get Seed/Range tuples from line of text
 * @param {string} line
 * @returns {[bigint, bigint][]}
 */
function getSeedRangesFromLine(line) {
    const stripped = line.replace('seeds:', '').trim();
    const mapped = mapToBigIntArray(stripped);
    let tuples = [];
    for (let i = 0; i < mapped.length; i += 2) {
        tuples.push(mapped.slice(i, i + 2));
    }

    return tuples;
}

/**
 * Splits space-separated list of numbers and maps to BigInt
 * @param {string} value
 * @returns {bigint[]}
 */
function mapToBigIntArray(value) {
    return value.split(/\s/).map(BigInt);
}

/**
 *
 * @param {string[]} lines
 * @returns {Almanac} soil almanac
 */
function getSeedAlmanacFromData(data) {
    let currentAlmanac;
    /** @type {Map<string, Almanac} */
    let almanacs = new Map();
    for (let i = 1; i < data.length; i++) {
        if (/(map)/.test(data[i])) {
            const datum = data[i].replace(' map:', '');
            const sourceCategory = datum.match(/^[a-z]*-/)[0].replace('-', '');
            const destinationCategory = datum.match(/[a-z]*$/)[0];
            const almanac = new Almanac({ sourceCategory, destinationCategory });
            almanacs.set(sourceCategory, almanac);
            currentAlmanac = almanac;
        } else {
            const rangeDeclaration = mapToBigIntArray(data[i]);
            currentAlmanac.addRangeDeclaration(rangeDeclaration);
        }
    }
    for (const almanac of almanacs.values()) {
        const destinationAlmanac = almanacs.get(almanac.destinationCategory);
        if (destinationAlmanac) {
            almanac.setDestinationAlmanac(destinationAlmanac);
        }
    }
    return almanacs.get('seed');
}

module.exports.getSeedsFromLine = getSeedsFromLine;
module.exports.getSeedAlmanacFromData = getSeedAlmanacFromData;
module.exports.mapToBigIntArray = mapToBigIntArray;
module.exports.getSeedRangesFromLine = getSeedRangesFromLine;
