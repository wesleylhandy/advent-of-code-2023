const { CubeGame } = require('./cube-game');

function decodeDataIntoCubeGames(data) {
    if (!Array.isArray(data)) {
        return [];
    }

    return data.map(d => new CubeGame(d));
}

module.exports.decodeDataIntoCubeGames = decodeDataIntoCubeGames;
