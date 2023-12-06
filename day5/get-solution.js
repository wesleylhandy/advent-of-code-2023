const { getDataByLine } = require('../common/get-data');
const { sortBigIntAscending } = require('../common/sort');
const { getSeedsFromLine, getSeedAlmanacFromData, getSeedRangesFromLine } = require('./transform-data');

async function getSolution() {
    const data = await (await getDataByLine(__dirname)).filter(Boolean);

    if (data.length === 0) {
        throw new Error('Unable to complete task without valid data');
    }

    const almanac = getSeedAlmanacFromData(data);

    const seedsAsSingleValues = new Set(getSeedsFromLine(data[0]));
    const seedsAsRanges = getSeedRangesFromLine(data[0]);

    return {
        lowestLocationSingleSeeds: Array.from(seedsAsSingleValues)
            .map(seed => almanac.getMappedDestinationValue(seed, 'location'))
            .sort(sortBigIntAscending)[0]
            .toString(),
        lowestLocationSeedRanges: Array.from(seedsAsRanges)
            .map(([startValue, range]) => almanac.getMappedDestinationValueFromRange(startValue, range, 'location'))
            .flat(7)
            .map(([startValue, _]) => startValue)
            .sort(sortBigIntAscending)[0]
            .toString(),
    };
}

module.exports.getSolution = getSolution;
