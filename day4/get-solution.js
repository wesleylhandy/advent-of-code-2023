const { getDataByLine } = require('../common/get-data');
const { transformDataIntoScratchCards, generateWinningCards } = require('./transform-data');

async function getSolution() {
    const data = await getDataByLine(__dirname);

    const scratchCards = transformDataIntoScratchCards(data);

    generateWinningCards(scratchCards);

    return {
        totalPoints: scratchCards.reduce((sum, card) => sum + card.getPointValue(), 0),
        totalCards: scratchCards.reduce((sum, card) => sum + card.totalInstances, 0),
    };
}

module.exports.getSolution = getSolution;
