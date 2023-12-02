const { CubeGameBag } = require('./cube-game-bag');
const { CubeGameReveal } = require('./cube-game-reveals');
const { isValidGameReveal } = require('./is-valid-reveal');
const { maxRevealByColor } = require('./max-reveal');

class CubeGame {
    #gameId = null;
    #reveals = [];
    constructor(gameData = '') {
        if (typeof gameData !== 'string') {
            throw new TypeError('gameData must be of type `string`');
        }
        this.#parseGame(gameData);
    }

    get gameId() {
        return this.#gameId;
    }

    getGamePower() {
        const maxGreen = this.#reveals.reduce(maxRevealByColor('green'), 1);
        const maxRed = this.#reveals.reduce(maxRevealByColor('red'), 1);
        const maxBlue = this.#reveals.reduce(maxRevealByColor('blue'), 1);

        return maxGreen * maxRed * maxBlue;
    }

    isGamePossible(cubeGameBag) {
        if (!(cubeGameBag instanceof CubeGameBag)) {
            throw new TypeError('cubeGameBag must be a valid CubeGameBag');
        }
        return this.#reveals.every(isValidGameReveal(cubeGameBag));
    }

    #parseGame(gameData) {
        const gameDataParts = gameData.split(': ');

        this.#parseGameId(gameDataParts);
        this.#parseGameReveals(gameDataParts);
    }

    #parseGameId(gameDataParts) {
        this.#gameId = gameDataParts.length > 0 ? Number.parseInt(gameDataParts[0].replace('Game ', ''), 10) : 0;
    }

    #parseGameReveals(gameDataParts) {
        const revealsData = gameDataParts.length > 1 ? gameDataParts[1] : '';
        const revealsDataParts = revealsData.split('; ');
        this.#reveals = revealsDataParts.map(p => new CubeGameReveal(p));
    }
}

module.exports.CubeGame = CubeGame;
