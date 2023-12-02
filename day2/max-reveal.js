const colors = new Set(['green', 'red', 'blue']);

/**
 * Curries array reducer function to determine max value for a given color of a game reveal
 * @param {String} color
 * @returns {function(number, CubeGameReveal): number} Array.reduce callback
 */
function maxRevealByColor(color) {
    if (!colors.has(color)) {
        throw new TypeError(`color must be one of: ${Array.from(colors).join(', ')}`);
    }

    /**
     * Array.reduce callback to calculate max value from a CubeGameReveal
     */
    return (max, reveal) => Math.max(reveal[color], max);
}

module.exports.maxRevealByColor = maxRevealByColor;
