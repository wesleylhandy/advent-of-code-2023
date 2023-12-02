const { CubeGameReveal } = require('./cube-game-reveals');
const { CubeGameBag } = require('./cube-game-bag');

function isValidGameReveal(cubeGameBag) {
    if (!(cubeGameBag instanceof CubeGameBag)) {
        throw new TypeError('cubeGameBag must be a valid CubeGameBag');
    }

    // console.log({ bag: {
    //         red: cubeGameBag.red,
    //         blue: cubeGameBag.blue,
    //         green: cubeGameBag.green
    // }})

    return reveal => {
        if (!(reveal instanceof CubeGameReveal)) {
            throw new TypeError('reveal must be a valid CubeGameReveal');
        }

        // console.log({ reveal: {
        //     red: reveal.red,
        //     blue: reveal.blue,
        //     green: reveal.green
        // }})

        return reveal.red <= cubeGameBag.red && reveal.blue <= cubeGameBag.blue && reveal.green <= cubeGameBag.green;
    };
}

module.exports.isValidGameReveal = isValidGameReveal;
