const { CubeGameBag } = require('./cube-game-bag');
const { CubeGameReveal } = require('./cube-game-reveals');
const { isValidGameReveal } = require('./is-valid-reveal');
const { maxRevealByColor } = require('./max-reveal');

class CubeGame {
    /** @type {(Number|null)} @private */
    #gameId = null;
    /** @type CubeGameReveal[] @private */
    #reveals = [];

    /**
     * Constructs a CubeGame from completed game data
     * @param {String} gameData
     *
     * @example
     * const game = new CubeGame('Game 95: 3 red; 7 green, 4 red, 7 blue; 5 red, 5 blue')
     */
    constructor(gameData = '') {
        if (typeof gameData !== 'string') {
            throw new TypeError('gameData must be of type `string`');
        }
        this.#parseGame(gameData);
    }

    get gameId() {
        // NOTE: 0 is invalid
        return this.#gameId ?? 0;
    }

    /**
     * Calculates a games Maximum Power By multiplying the max number of respective colored cubes,
     * indicidating the minimum number of cubes that must be present for all the games to have been valid
     * @returns {Number} Max Red Cubes * Max Green Cubes * Max Blue Cubes
     */
    getGamePower() {
        // NOTE: minimum max should be 1 since multiplying by zero will return incorrect results (identity principle)
        const maxGreen = this.#reveals.reduce(maxRevealByColor('green'), 1);
        const maxRed = this.#reveals.reduce(maxRevealByColor('red'), 1);
        const maxBlue = this.#reveals.reduce(maxRevealByColor('blue'), 1);

        return maxGreen * maxRed * maxBlue;
    }

    /**
     * Determines whether or not every reveal from the bag is possible give a CubeGameBag
     * @param {CubeGameBag} cubeGameBag
     * @returns {boolean} true or false
     */
    isGamePossible(cubeGameBag) {
        if (!(cubeGameBag instanceof CubeGameBag)) {
            throw new TypeError('cubeGameBag must be a valid CubeGameBag');
        }
        return this.#reveals.every(isValidGameReveal(cubeGameBag));
    }

    /**
     * Parses gamedata into useable components
     * @param {String} gameData
     *
     * @private
     */
    #parseGame(gameData) {
        const gameDataParts = gameData.split(': ');

        this.#parseGameId(gameDataParts);
        this.#parseGameReveals(gameDataParts);
    }

    /**
     * Sets the Game Id from split gameData
     * @param {String[]} gameDataParts
     *
     * @private
     *
     * @example
     * this.#parseGameId(['Game 95'], ['3 red; 7 green, 4 red, 7 blue; 5 red, 5 blue'])
     */
    #parseGameId(gameDataParts) {
        this.#gameId = gameDataParts.length > 0 ? Number.parseInt(gameDataParts[0].replace('Game ', ''), 10) : 0;
    }

    /**
     * Sets the Game Reveals from split gameData
     * @param {String[]} gameDataParts
     *
     * @private
     *
     * @example
     * this.#parseGameId(['Game 95'], ['3 red; 7 green, 4 red, 7 blue; 5 red, 5 blue'])
     */
    #parseGameReveals(gameDataParts) {
        const revealsData = gameDataParts.length > 1 ? gameDataParts[1] : '';
        const revealsDataParts = revealsData.split('; ');
        this.#reveals = revealsDataParts.map(p => new CubeGameReveal(p));
    }
}

module.exports.CubeGame = CubeGame;
