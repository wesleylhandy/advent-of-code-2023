const { getDataByLine } = require('../common/get-data');
const { reduceToSum } = require('../common/reducers');
const {
    decodeDataIntoCalibrationValues,
    decodeDataIntoCalibrationValuesReadingEnglishNumbers,
} = require('./transform-data');

async function getSolution() {
    const data = await getDataByLine(__dirname);
    const decodedCalibrationData = decodeDataIntoCalibrationValues(data);
    const decodedGranularCalibrationData = decodeDataIntoCalibrationValuesReadingEnglishNumbers(data);

    return {
        calibrationSum: reduceToSum(decodedCalibrationData),
        calibrationGranularSum: reduceToSum(decodedGranularCalibrationData),
    };
}

module.exports.getSolution = getSolution;
