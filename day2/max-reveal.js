const colors = new Set(['green', 'red', 'blue']);
function maxRevealByColor(color) {
    if (!colors.has(color)) {
        throw new TypeError(`color must be one of: ${Array.from(colors).join(', ')}`);
    }

    return (max, reveal) => Math.max(reveal[color], max);
}

module.exports.maxRevealByColor = maxRevealByColor;
