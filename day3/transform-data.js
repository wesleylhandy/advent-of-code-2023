const { DataNode } = require('./data-node');

/**
 * Transforms 2d array into graph of DataNodes
 * @param {string[][]} data
 * @returns {DataNode[]}
 */
function transformDataIntoDataNodes(data) {
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
            const topNode = row > 0 ? dataNodes[(row - 1) * columns + col] : null;
            const bottomNode = row + 1 < rows ? dataNodes[(row + 1) * columns + col] : null;
            const leftNode = col > 0 ? dataNodes[currentIndex - 1] : null;
            const rightNode = col + 1 < columns ? dataNodes[currentIndex + 1] : null;
            dataNodes[currentIndex].initializeNeighbors(topNode, leftNode, rightNode, bottomNode);
        }
    }

    return dataNodes;
}

module.exports.transformDataIntoDataNodes = transformDataIntoDataNodes;
