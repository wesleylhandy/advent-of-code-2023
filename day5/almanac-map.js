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
        console.log(
            'Setting Destination Almanac for',
            this.#sourceCategory,
            'with destination:',
            almanac.sourceCategory,
        );
        console.log('Destination Category of', almanac.sourceCategory, 'is:', almanac.destinationCategory);
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
     * @param {Almanac|null} sourceMap
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
     * Generate Mapped Value From Source Value
     * If value is not mapped, returns null
     * @param {value} sourceValue
     * @returns {bigint}
     */
    #getMappedValue(sourceValue) {
        const range = this.#rangeDeclarations.find(([_, s, r]) => s + r > sourceValue && sourceValue >= s);
        if (range) {
            return range[0] + (sourceValue - range[1]);
        }
        return sourceValue;
    }
}

module.exports.Almanac = Almanac;
