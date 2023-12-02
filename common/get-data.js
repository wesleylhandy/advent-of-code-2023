const { readFile } = require('node:fs/promises');
const { resolve } = require('node:path');

/**
 * Asynchronously gets data from a given directory to an array of lines
 * @param {String} dirName
 * @returns {Promise<String[]>} files contents by line
 */
async function getDataByLine(dirName) {
    const data = await readData(dirName);
    return data?.split('\n') ?? [];
}

/**
 * Asynchronously reads file named `./data/data.txt` from a given directory to a string value
 * @param {String} dirName
 * @returns {Promise<String|null>} contents
 */
async function readData(dirName) {
    try {
        const filePath = resolve(dirName, './data/data.txt');
        const data = await readFile(filePath, {
            encoding: 'utf-8',
        });
        return data;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

module.exports.getDataByLine = getDataByLine;
