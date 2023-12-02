const { CubeGameReveal } = require('./cube-game-reveals');
const { CubeGameBag } = require('./cube-game-bag');

/**
 * Curried function that determines whether or not a game reveal is valid given a CubeGameBag
 * @param {CubeGameBag} cubeGameBag
 * @returns {function(CubeGameReveal): boolean} true or false
 */
function isValidGameReveal(cubeGameBag) {
    if (!(cubeGameBag instanceof CubeGameBag)) {
        throw new TypeError('cubeGameBag must be a valid CubeGameBag');
    }

    return reveal => {
        if (!(reveal instanceof CubeGameReveal)) {
            throw new TypeError('reveal must be a valid CubeGameReveal');
        }

        return reveal.red <= cubeGameBag.red && reveal.blue <= cubeGameBag.blue && reveal.green <= cubeGameBag.green;
    };
}

module.exports.isValidGameReveal = isValidGameReveal;
