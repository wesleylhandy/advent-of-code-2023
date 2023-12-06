const { getDataByLine } = require('../common/get-data');
const { Race } = require('./race');
const { getTimesFromLine, getRecordDistancesFromData } = require('./transform-data');

async function getSolution() {
    const data = await getDataByLine(__dirname);

    if (data.length < 2) {
        throw new Error('Invalid input data');
    }

    const times = getTimesFromLine(data[0]);
    const distances = getRecordDistancesFromData(data[1]);

    /** @type {Race[]} */
    const races = [];
    for (let i = 0; i < times.length; i++) {
        races.push(new Race(times[i], distances[i]));
    }

    const singleTime = BigInt(times.join(''));
    const singleDistance = BigInt(distances.join(''));

    const singleRace = new Race(singleTime, singleDistance);

    return {
        waysToBeatRecordDistanceWhenMultipleRaces: races.reduce(
            (product, race) => product * race.getCountOfPossibleRecordBreakingRaceConditionsBySimulation(),
            1,
        ),
        waysToBeatRecordDistanceWhenSingleRace: singleRace
            .getCountOfPossibleRecordBreakingRaceConditionsByMinMax()
            .toString(),
    };
}

module.exports.getSolution = getSolution;
