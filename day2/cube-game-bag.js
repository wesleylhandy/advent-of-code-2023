class CubeGameBag {
    /** @type {(Number|undefined)} @private */
    #blue;
    /** @type {(Number|undefined)} @private */
    #green;
    /** @type {(Number|undefined)} @private */
    #red;
    constructor(numRed, numGreen, numBlue) {
        if (typeof numRed !== 'number') {
            throw new TypeError('numRed must be of type `number`');
        }
        if (typeof numGreen !== 'number') {
            throw new TypeError('numGreen must be of type `number`');
        }
        if (typeof numBlue !== 'number') {
            throw new TypeError('numBlue must be of type `number`');
        }
        this.#blue = numBlue;
        this.#green = numGreen;
        this.#red = numRed;
    }

    get blue() {
        return this.#blue;
    }

    get green() {
        return this.#green;
    }

    get red() {
        return this.#red;
    }
}

module.exports.CubeGameBag = CubeGameBag;
