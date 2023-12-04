const { ScratchCard } = require('./scratch-card');

/**
 * @typedef {Object} ScratchCardData
 * @property {number} cardId
 * @property {number[]} winningNumbers
 * @property {number[]} playedNumbers
 */

/**
 *
 * @param {string[]} data
 * @returns {ScratchCard[]}
 */
function transformDataIntoScratchCards(data) {
    return data.map(datum => {
        const { cardId, winningNumbers, playedNumbers } = parseScratchCardDatum(datum);
        return new ScratchCard(cardId, winningNumbers, playedNumbers);
    });
}

/**
 *
 * @param {string} datum
 * @returns {ScratchCardData}
 */
function parseScratchCardDatum(datum) {
    const dataParts = datum.split(': ');
    const cardId = dataParts.length > 0 ? Number.parseInt(dataParts[0].replace('Card ', '')) : -1;
    const gameParts = dataParts.length > 1 ? dataParts[1].split(' | ') : [];
    const winningNumbers = gameParts.length > 0 ? splitIntoArrayAndParseInt(gameParts[0]) : [];
    const playedNumbers = gameParts.length > 1 ? splitIntoArrayAndParseInt(gameParts[1]) : [];

    return {
        cardId,
        winningNumbers,
        playedNumbers,
    };
}

/**
 *
 * @param {ScratchCard[]} scratchCards
 * @returns {void}
 */
function generateWinningCards(scratchCards) {
    for (let i = 0; i < scratchCards.length; i++) {
        const numberOfWinningMatches = scratchCards[i].getNumberOfWinningMatches();
        const instances = scratchCards[i].totalInstances;
        for (let j = 0; j < numberOfWinningMatches && j + 1 < scratchCards.length; j++) {
            // Add instances to cards in range beyond initial card
            scratchCards[i + j + 1].addInstance(instances);
        }
    }
}

/**
 *
 * @param {string} value
 * @returns {number[]}
 */
function splitIntoArrayAndParseInt(value) {
    // Split only on spaces that are immediately preceded by a number, such that, for example, '12  1' is split into ['12', '01']
    return value.split(/(?<=[0-9])\s/).map(v => Number.parseInt(v.trim()));
}

module.exports.transformDataIntoScratchCards = transformDataIntoScratchCards;
module.exports.generateWinningCards = generateWinningCards;
