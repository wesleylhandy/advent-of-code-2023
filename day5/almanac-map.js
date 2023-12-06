const { isWithinRange, areRangesOverlapping, bigIntMax, getOverlappingRange } = require('../common/compare');

/**
 * @typedef {Object} AlmanacMapConstructorArgs
 * @property {string} sourceCategory
 * @property {string} destinationCategory
 */

/**
 * @typedef {bigint} DestinationRangeStart
 */

/**
 * @typedef {bigint} SourceRangeStart
 */

/**
 * @typedef {bigint} RangeLength
 */

/**
 * @typedef {Map<bigint, bigint>} SourceToDestinationMap
 */

/**
 * @typedef {[DestinationRangeStart, SourceRangeStart, RangeLength]} RangeDeclaration
 */

/**
 * @typedef {RangeDeclaration[]} RangeDeclarations
 */

class Almanac {
    /** @type {string} @private */
    #sourceCategory;
    /** @type {string} @private */
    #destinationCategory;
    /** @type {Almanac|undefined} @private */
    #destinationAlmanac;
    /** @type {RangeDeclarations} @private */
    #rangeDeclarations;

    /**
     * Constructs a new Almanac Map
     * @param {AlmanacMapConstructorArgs} args
     */
    constructor(args) {
        if (!(this instanceof Almanac)) {
            return new Almanac(args);
        }
        const { sourceCategory, destinationCategory } = args;
        this.#destinationCategory = destinationCategory;
        this.#sourceCategory = sourceCategory;
    }

    get sourceCategory() {
        return this.#sourceCategory;
    }

    get destinationCategory() {
        return this.#destinationCategory;
    }

    get destinationAlmanac() {
        return this.#destinationAlmanac;
    }

    /**
     * @param {Almanac} almanac
     */
    setDestinationAlmanac(almanac) {
        this.#destinationAlmanac = almanac;
    }

    /**
     *
     * @param {RangeDeclaration} rangeDeclaration
     */
    addRangeDeclaration(rangeDeclaration) {
        this.#rangeDeclarations = [...(this.#rangeDeclarations ?? []), rangeDeclaration].sort((a, b) => {
            if (a[1] < b[1]) return -1;
            if (a[1] > b[1]) return 1;
            return 0;
        });
    }

    /**
     * Gets Final Destination Value mapped to Source Value
     * @param {number} sourceValue
     * @param {string} destinationCategory
     *
     * @returns {bigint}
     */
    getMappedDestinationValue(sourceValue, destinationCategory) {
        const mappedDestinationValue = this.#getMappedValue(sourceValue);
        if (this.#destinationCategory === destinationCategory) {
            return mappedDestinationValue;
        }
        if (typeof this.destinationAlmanac === 'undefined') {
            return sourceValue;
        }
        return this.destinationAlmanac.getMappedDestinationValue(mappedDestinationValue, destinationCategory);
    }

    /**
     * Gets Final Destination Value mapped to Source Value
     * @param {SourceRangeStart} sourceValue
     * @param {RangeLength} sourceRangeLength
     * @param {string} destinationCategory
     *
     * @returns {[SourceRangeStart, RangeLength][]}
     */
    getMappedDestinationValueFromRange(sourceValue, sourceRangeLength, destinationCategory) {
        const matchingRanges = this.#getMatchingRanges(sourceValue, sourceRangeLength);
        if (this.#destinationCategory === destinationCategory) {
            return matchingRanges;
        }
        if (typeof this.destinationAlmanac === 'undefined') {
            return [[sourceValue, sourceRangeLength]];
        }
        return matchingRanges.map(([start, range]) =>
            this.destinationAlmanac.getMappedDestinationValueFromRange(start, range, destinationCategory),
        );
    }

    /**
     *
     * @param {SourceRangeStart} sourceValue
     * @param {RangeLength} sourceRangeLength
     * @returns {[SourceRangeStart, RangeLength][]}
     */
    #getMatchingRanges(sourceValue, sourceRangeLength) {
        const ranges = this.#rangeDeclarations.filter(([_, sourceStart, range]) =>
            areRangesOverlapping(sourceStart, range, sourceValue, sourceRangeLength),
        );

        if (ranges.length === 0) {
            return [[sourceValue, sourceRangeLength]];
        }
        return ranges.map(([destinationStart, sourceStart, range]) => {
            return [
                bigIntMax(destinationStart, destinationStart + sourceValue - sourceStart),
                getOverlappingRange(sourceStart, range, sourceValue, sourceRangeLength),
            ];
        });
    }

    /**
     * Generate Mapped Value From Source Value
     * If value is not mapped, returns null
     * @param {value} sourceValue
     * @returns {bigint}
     */
    #getMappedValue(sourceValue) {
        const rangeDeclaration = this.#rangeDeclarations.find(([_, sourceStart, range]) =>
            isWithinRange(sourceValue, sourceStart, range),
        );
        if (rangeDeclaration) {
            return rangeDeclaration[0] + (sourceValue - rangeDeclaration[1]);
        }
        return sourceValue;
    }
}

module.exports.Almanac = Almanac;
