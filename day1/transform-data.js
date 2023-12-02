const { stripNonNumericsFromString } = require('../common/strip-non-numerics-from-string');

const numberNamesToDigits = new Map([
    ['oneight', '18'],
    ['twone', '21'],
    ['threeight', '38'],
    ['fiveight', '58'],
    ['sevenine', '79'],
    ['eightwo', '82'],
    ['eighthree', '83'],
    ['nineight', '98'],
    ['one', '1'],
    ['two', '2'],
    ['three', '3'],
    ['four', '4'],
    ['five', '5'],
    ['six', '6'],
    ['seven', '7'],
    ['eight', '8'],
    ['nine', '9'],
]);

function decodeDataIntoCalibrationValues(data) {
    if (!Array.isArray(data)) {
        return [];
    }

    return data.map(decodeNonNumerics);
}

function decodeDataIntoCalibrationValuesReadingEnglishNumbers(data) {
    if (!Array.isArray(data)) {
        return [];
    }

    return data.map(datum => {
        let transformedDatum = datum;
        for (const [key, value] of numberNamesToDigits.entries()) {
            if (transformedDatum.includes(key)) {
                transformedDatum = transformedDatum.replaceAll(key, value);
            }
        }
        return decodeNonNumerics(transformedDatum);
    });
}

function decodeNonNumerics(datum) {
    const strippedDatum = stripNonNumericsFromString(datum);

    return strippedDatum.length === 0 ? '0' : strippedDatum[0] + strippedDatum[strippedDatum.length - 1];
}

module.exports.decodeDataIntoCalibrationValues = decodeDataIntoCalibrationValues;
module.exports.decodeDataIntoCalibrationValuesReadingEnglishNumbers =
    decodeDataIntoCalibrationValuesReadingEnglishNumbers;
