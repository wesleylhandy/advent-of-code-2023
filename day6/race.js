class Race {
    /** @type {number|bigint} @private */
    #raceLengthInMS;
    /** @type {number|bigint} @private */
    #recordDistanceInMm;
    /** @type {number[]} @private */
    #simulatedRaceResults;

    /**
     * Constructs a new Race Instance
     * @param {number|bigint} raceLengthInMs
     * @param {number|bigint} recordDistanceInMm
     */
    constructor(raceLengthInMs, recordDistanceInMm) {
        this.#raceLengthInMS = raceLengthInMs;
        this.#recordDistanceInMm = recordDistanceInMm;
    }

    /**
     * Calculate count of possible winning races by simulating all valied button press times
     * @returns {number} Count of Record Breaking Race Possibilities
     */
    getCountOfPossibleRecordBreakingRaceConditionsBySimulation() {
        if (typeof this.#recordDistanceInMm === 'bigint') {
            return this.getCountOfPossibleRecordBreakingRaceConditionsByMinMax();
        }
        this.#simulateAllPossibleRaceResults();
        return this.#simulatedRaceResults.filter(result => result > this.#recordDistanceInMm).length;
    }

    /**
     * Calculate count of possible winning races by determining minimum winning button press time
     * @returns {bigint} Count of Record Breaking Race Possibilities
     */
    getCountOfPossibleRecordBreakingRaceConditionsByMinMax() {
        if (typeof this.#recordDistanceInMm !== 'bigint') {
            return this.getCountOfPossibleRecordBreakingRaceConditionsBySimulation();
        }
        const minimumButtonPress = this.#getMinimumButtonPressTimeToBreakRecord();
        // NOTE: Add 1 to account for number itself
        return this.#raceLengthInMS - minimumButtonPress - minimumButtonPress + 1n;
    }

    #simulateAllPossibleRaceResults() {
        /** @type {number[]} */
        const simulatedRaceResults = [];
        for (let i = 0; i <= this.#raceLengthInMS; i++) {
            simulatedRaceResults.push(this.#simulateRaceAndGetTotalDistance(i));
        }
        this.#simulatedRaceResults = simulatedRaceResults;
    }

    /**
     * Calculates Total Distance traveled based on length of button press
     * Button presses length is coupled (1:1) with corresponding speed
     * -- each 1ms of press times increases rate by 1mm/ms speed
     * @param {number} timePressingButtonInMs
     * @returns {number} Total Distance Traveled in Race
     */
    #simulateRaceAndGetTotalDistance(timePressingButtonInMs) {
        const speedInMmPerMs = timePressingButtonInMs;
        const remainingTime = this.#raceLengthInMS - timePressingButtonInMs;
        return remainingTime < 1 ? 0 : remainingTime * speedInMmPerMs;
    }

    /**
     * Calculates minimum button press time to break record by looping through possibilities until first win is found
     * @returns {bigint|undefined} minimum button press time to break record
     */
    #getMinimumButtonPressTimeToBreakRecord() {
        for (let i = 0n; i <= this.#raceLengthInMS; i += 1n) {
            if (this.#willButtonPressBreakRecordDistance(i)) {
                return i;
            }
        }
        return undefined;
    }

    /**
     * Determines if a given button press will break distance record
     * @param {number} timePressingButtonInMs
     * @returns {boolean}
     */
    #willButtonPressBreakRecordDistance(timePressingButtonInMs) {
        // (lengthInMs - msPressing) * rate > record
        return (this.#raceLengthInMS - timePressingButtonInMs) * timePressingButtonInMs > this.#recordDistanceInMm;
    }
}

module.exports.Race = Race;
