class ScratchCard {
    /** @type {number} @private */
    #cardId;
    /** @type {Set<number>} @private */
    #winningNumbers;
    /** @type {Set<number>} @private */
    #playedNumbers;
    /** @type {number} @private */
    #totalInstances;

    /**
     *
     * @param {number} cardId
     * @param {number[]} winningNumbers
     * @param {number[]} playedNumbers
     */
    constructor(cardId, winningNumbers, playedNumbers) {
        if (!(this instanceof ScratchCard)) {
            return new ScratchCard(cardId, winningNumbers, playedNumbers);
        }
        this.#cardId = cardId;
        this.#winningNumbers = new Set(winningNumbers);
        this.#playedNumbers = new Set(playedNumbers);
        this.#totalInstances = 1;
    }

    get cardId() {
        return this.#cardId;
    }

    get winningNumbers() {
        return Array.from(this.#winningNumbers);
    }

    get playedNumbers() {
        return Array.from(this.#playedNumbers);
    }

    get totalInstances() {
        return this.#totalInstances;
    }

    /**
     * Adds Additional Instances of Scratch Card
     * @param {number} instances
     */
    addInstance(instances = 1) {
        this.#totalInstances = this.#totalInstances + instances;
    }

    /**
     * Gets Number of Winning Matches for Played Numbers
     * @returns {number}
     */
    getNumberOfWinningMatches() {
        return Array.from(this.#playedNumbers).filter(value => this.#winningNumbers.has(value)).length;
    }

    /**
     * Get Point Value of Winning Numbers from Played Numbers,
     * where point value is 0, for 0, 1 for 1, and doubled for each match after 1
     *
     * @returns {Number}
     */
    getPointValue() {
        const numberOfWinningMatches = this.getNumberOfWinningMatches();
        return numberOfWinningMatches > 0 ? Math.pow(2, numberOfWinningMatches - 1) : 0;
    }
}

module.exports.ScratchCard = ScratchCard;
