const { CubeGame } = require('./cube-game');

/**
 * Decodes data array into an array of CubeGames
 * @param {String[]} data
 * @returns {CubeGame[]}
 */
function decodeDataIntoCubeGames(data) {
    if (!Array.isArray(data)) {
        return [];
    }

    return data.map(d => new CubeGame(d));
}

module.exports.decodeDataIntoCubeGames = decodeDataIntoCubeGames;
