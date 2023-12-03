const { getDataAsTable } = require('../common/get-data');
const { reduceToProduct } = require('../common/reducers');
const { transformDataIntoDataNodes } = require('./transform-data');

async function getSolution() {
    const data = await getDataAsTable(__dirname);

    const dataNodes = transformDataIntoDataNodes(data);

    return {
        sumOfEngineParts: dataNodes.reduce((sum, node) => {
            const tokenValue = node.getSchematicTokenValue();
            if (tokenValue === null) {
                return sum;
            }
            return sum + Number.parseInt(tokenValue, 10);
        }, 0),
        sumOfGearRatios: dataNodes.reduce((sum, node) => {
            const isValidGear = node.isGearAdjacentToTwoTokens();
            if (!isValidGear) {
                return sum;
            }
            return sum + reduceToProduct(node.adjacentTokens);
        }, 0),
    };
}

module.exports.getSolution = getSolution;
