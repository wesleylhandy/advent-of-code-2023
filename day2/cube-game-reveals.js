class CubeGameReveal {
    #blue;
    #green;
    #red;
    constructor(revealData = '') {
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

    #parseRevealData(revealData) {
        const revealDataParts = revealData.split(', ');
        for (const part of revealDataParts) {
            const reveal = part.split(/\s/);
            const revealNumber = Number.parseInt(reveal[0]);
            switch (reveal[1]) {
                case 'green':
                    this.#green = revealNumber;
                    break;
                case 'red':
                    this.#red = revealNumber;
                    break;
                case 'blue':
                    this.#blue = revealNumber;
                default:
                    break;
            }
        }
    }
}

module.exports.CubeGameReveal = CubeGameReveal;
