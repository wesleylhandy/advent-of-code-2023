const { readFile } = require('node:fs/promises');
const { resolve } = require('node:path');

async function getDataByLine(dirName) {
    const data = await readData(dirName);
    return data.split('\n') ?? [];
}

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
