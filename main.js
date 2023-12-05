const day1 = require('./day1/get-solution');
const day2 = require('./day2/get-solution');
const day3 = require('./day3/get-solution');
const day4 = require('./day4/get-solution');
const day5 = require('./day5/get-solution');

const getSolutionByDay = new Map([
    ['1', day1.getSolution],
    ['2', day2.getSolution],
    ['3', day3.getSolution],
    ['4', day4.getSolution],
    ['5', day5.getSolution],
]);

async function main() {
    const day = process.argv[2];
    if (!getSolutionByDay.has(day)) {
        console.error(
            `Specified day must be one of: ${Array.from(getSolutionByDay.keys()).join(
                ', ',
            )}\nExample: node ./main.js 1`,
        );
    }
    const getSolution = getSolutionByDay.get(day);
    const solution = await getSolution();
    console.log(solution);
}

main();
