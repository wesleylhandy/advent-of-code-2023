const { readFile } = require('node:fs/promises');
const { resolve } = require('node:path');

async function getData()
{
    const data = await readData();
    return data.split('\n') ?? []
}

async function readData(){
    try {
        const filePath = resolve(__dirname, './data/data.txt');
        const data = await readFile(filePath, {
            encoding: 'utf-8'
        });
        return data;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

module.exports.getData = getData;