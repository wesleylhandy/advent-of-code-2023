const {getData} = require('./get-data');
const {decodeDataIntoCalibrationValues, decodeDataIntoCalibrationValuesReadingEnglishNumbers} = require('./transform-data')

async function getSolution() {
    const data = await getData();
    const decodedCalibrationData = decodeDataIntoCalibrationValues(data);
    const decodedGranularCalibrationData = decodeDataIntoCalibrationValuesReadingEnglishNumbers(data);

    return {
        calibrationSum: reduceToSum(decodedCalibrationData),
        calibrationGranularSum: reduceToSum(decodedGranularCalibrationData) 
    }
}

function reduceToSum(array) {
    return array.reduce((sum, value) => {
        return sum + Number.parseInt(value, 10);
    }, 0);
}

module.exports.getSolution = getSolution