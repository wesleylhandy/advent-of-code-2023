const { getDataAsTable } = require('../common/get-data');
const { reduceToSum } = require('../common/reducers');
const { DataNode } = require('./data-node');

async function getSolution() {
    const data = await getDataAsTable(__dirname);

    /**
     * @type {DataNode[]}
     */
    let dataNodes = [];
    const rows = data.length;
    const columns = data.length > 0 ? data[0].length : 0;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            dataNodes.push(new DataNode(data[row][col]));
        }
    }

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const currentIndex = row * columns + col;
            dataNodes[currentIndex].initializeNeighbors(
                row > 0 ? dataNodes[(row - 1) * columns + col] : null,
                col > 0 ? dataNodes[currentIndex - 1] : null,
                col + 1 < columns ? dataNodes[currentIndex + 1] : null,
                row + 1 < rows ? dataNodes[(row + 1) * columns + col] : null,
            );
        }
    }

    return {
        sumOfEngineParts: dataNodes.reduce((sum, node) => {
            const tokenValue = node.getTokenValue();
            if (tokenValue === null) {
                return sum;
            }
            return sum + Number.parseInt(tokenValue, 10);
        }, 0),
    };
}

module.exports.getSolution = getSolution;
