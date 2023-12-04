class CubeGameReveal {
    /** @type {(Number|undefined)} @private */
    #blue;
    /** @type {(Number|undefined)} @private */
    #green;
    /** @type {(Number|undefined)} @private */
    #red;

    /**
     * Constructs a CubeGameReveal from parsed reveal data
     * @param {String} revealData
     *
     * @example
     * const game = new CubeGameReveal('3 red; 7 green, 4 red, 7 blue; 5 red, 5 blue')
     */
    constructor(revealData = '') {
        if (!(this instanceof CubeGameReveal)) {
            return new CubeGameReveal(revealData);
        }
        if (typeof revealData !== 'string') {
            throw new TypeError('revealData must be of type `string`');
        }
        this.#parseRevealData(revealData);
    }

    get blue() {
        return this.#blue ?? 0;
    }

    get green() {
        return this.#green ?? 0;
    }

    get red() {
        return this.#red ?? 0;
    }

    /**
     * Sets the reveal value for each color based on data
     * @param {string} revealData
     *
     * @private
     *
     * @example
     * this.#parseRevealData('7 green, 4 red, 7 blue')
     */
    #parseRevealData(revealData) {
        const revealDataParts = revealData.split(', ');
        for (const part of revealDataParts) {
            const [value, color] = part.split(/\s/);
            const parsedValue = Number.parseInt(value);
            switch (color) {
                case 'green':
                    this.#green = parsedValue;
                    break;
                case 'red':
                    this.#red = parsedValue;
                    break;
                case 'blue':
                    this.#blue = parsedValue;
                default:
                    break;
            }
        }
    }
}

module.exports.CubeGameReveal = CubeGameReveal;
