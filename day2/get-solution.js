const { getDataByLine } = require('../common/get-data');
const { CubeGameBag } = require('./cube-game-bag');
const { decodeDataIntoCubeGames } = require('./transform-data');

async function getSolution() {
    const data = await getDataByLine(__dirname);

    const cubeGameBag = new CubeGameBag(12, 13, 14);

    const cubeGames = decodeDataIntoCubeGames(data);

    const possibleGames = cubeGames.filter(game => game.isGamePossible(cubeGameBag));

    return {
        possibleGames: possibleGames.reduce((sum, game) => sum + game.gameId, 0),
    };
}

module.exports.getSolution = getSolution;
