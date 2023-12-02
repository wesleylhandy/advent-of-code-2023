const day1 = require('./day1/get-solution');
const day2 = require('./day2/get-solution');

const getSolutionByDay = new Map([
    ['1', day1.getSolution],
    ['2', day2.getSolution],
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
