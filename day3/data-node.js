const GEAR_SYMBOL = '*';

class DataNode {
    /** @type {string|null} @private */
    #value;
    /** @type {DataNode|null} @private */
    #left;
    /** @type {DataNode|null} @private */
    #right;
    /** @type {DataNode|null} @private */
    #top;
    /** @type {DataNode|null} @private */
    #bottom;
    /** @type {boolean} @private */
    #hasInitializedNeighbors = false;
    /** @type {string[]} @private */
    #adjacentTokens = false;

    /**
     * Constructs new DataNode
     * @param {string} value
     */
    constructor(value) {
        if (!(this instanceof DataNode)) {
            return new DataNode(value);
        }
        this.#value = value;
        this.#hasInitializedNeighbors = false;
    }

    get value() {
        return this.#value;
    }

    get left() {
        if (!this.#hasInitializedNeighbors) {
            console.warn('DataNode neighbors have not been initialized.');
        }
        return this.#left;
    }

    get right() {
        if (!this.#hasInitializedNeighbors) {
            console.warn('DataNode neighbors have not been initialized.');
        }
        return this.#right;
    }

    get top() {
        if (!this.#hasInitializedNeighbors) {
            console.warn('DataNode neighbors have not been initialized.');
        }
        return this.#top;
    }

    get bottom() {
        if (!this.#hasInitializedNeighbors) {
            console.warn('DataNode neighbors have not been initialized.');
        }
        return this.#bottom;
    }

    get adjacentTokens() {
        return this.#adjacentTokens;
    }

    /**
     *
     * @param {DataNode|null} top
     * @param {DataNode|null} left
     * @param {DataNode|null} right
     * @param {DataNode|null} bottom
     */
    initializeNeighbors(top, left, right, bottom) {
        if (this.#hasInitializedNeighbors) {
            throw new Error('DataNode neighbors have already been initialized');
        }
        this.#top = top;
        this.#left = left;
        this.#right = right;
        this.#bottom = bottom;
        this.#hasInitializedNeighbors = true;
    }

    isSymbol() {
        return /[^0-9.]/.test(this.#value);
    }

    /**
     * Determines if Value is `'*'`
     * @returns {Boolean}
     */
    isGearSymbol() {
        return this.#value === GEAR_SYMBOL;
    }

    isDigit() {
        return /[0-9]/.test(this.#value);
    }

    isAdjacentSymbol() {
        // check if symbol top
        if (this.#top?.isSymbol()) {
            return true;
        }
        // check if symbol bottom
        if (this.#bottom?.isSymbol()) {
            return true;
        }
        // check if symbol right
        if (this.#right?.isSymbol()) {
            return true;
        }
        // check if symbol left
        if (this.#left?.isSymbol()) {
            return true;
        }
        // check if symbol bottom left
        if (this.#bottom?.left?.isSymbol()) {
            return true;
        }
        // check if symbol bottom right
        if (this.#bottom?.right?.isSymbol()) {
            return true;
        }
        // check if symbol top left
        if (this.#top?.left?.isSymbol()) {
            return true;
        }
        // check if symbol top right
        if (this.#top?.right?.isSymbol()) {
            return true;
        }
    }

    isGearAdjacentToTwoTokens() {
        return this.#getAdjacentTokens().length === 2;
    }

    /**
     * Gets Tokens Adjacent to Gear Symbol
     * @returns {string[]}
     */
    #getAdjacentTokens() {
        if (!this.isGearSymbol()) {
            return [];
        }

        /** @type string[] */
        let adjacentTokens = [];

        // check if digit right
        if (this.#right?.isDigit()) {
            adjacentTokens.push(this.#right.getRawTokenValue());
        }

        // check if digit left
        if (this.#left?.isDigit()) {
            adjacentTokens.push(this.#left.getRawTokenValue());
        }

        let bottomCleared = false;

        // check if all bottom are digits
        if (this.#bottom?.left?.isDigit() && this.#bottom?.isDigit() && this.#bottom?.right?.isDigit()) {
            adjacentTokens.push(this.#bottom.getRawTokenValue());
            bottomCleared = true;
        }

        // check if bottom && bottom-left are digits
        if (!bottomCleared && this.#bottom?.left?.isDigit() && this.#bottom?.isDigit()) {
            adjacentTokens.push(this.#bottom.getRawTokenValue());
            bottomCleared = true;
        }

        // check if bottom && bottom-right are digits
        if (!bottomCleared && this.#bottom?.right?.isDigit() && this.#bottom?.isDigit()) {
            adjacentTokens.push(this.#bottom.getRawTokenValue());
            bottomCleared = true;
        }

        // check if bottom is digit
        if (!bottomCleared && this.#bottom?.isDigit()) {
            adjacentTokens.push(this.#bottom.getRawTokenValue());
            bottomCleared = true;
        }

        // check if bottom-right is digit
        if (!bottomCleared && this.#bottom?.right?.isDigit()) {
            adjacentTokens.push(this.#bottom.right.getRawTokenValue());
        }

        // check if bottom-left is digit
        if (!bottomCleared && this.#bottom?.left?.isDigit()) {
            adjacentTokens.push(this.#bottom.left.getRawTokenValue());
        }

        let topCleared = false;

        // check if all top are digits
        if (this.#top?.left?.isDigit() && this.#top?.isDigit() && this.#top?.right?.isDigit()) {
            adjacentTokens.push(this.#top.getRawTokenValue());
            topCleared = true;
        }

        // check if top && top-left are digits
        if (!topCleared && this.#top?.left?.isDigit() && this.#top?.isDigit()) {
            adjacentTokens.push(this.#top.getRawTokenValue());
            topCleared = true;
        }

        // check if top && top-right are digits
        if (!topCleared && this.#top?.right?.isDigit() && this.#top?.isDigit()) {
            adjacentTokens.push(this.#top.getRawTokenValue());
            topCleared = true;
        }

        // check if top is digit
        if (!topCleared && this.#top?.isDigit()) {
            adjacentTokens.push(this.#top.getRawTokenValue());
            topCleared = true;
        }

        // check if top-right is digit
        if (!topCleared && this.#top?.right?.isDigit()) {
            adjacentTokens.push(this.#top.right.getRawTokenValue());
        }

        // check if top-left is digit
        if (!topCleared && this.#top?.left?.isDigit()) {
            adjacentTokens.push(this.#top.left.getRawTokenValue());
        }

        this.#adjacentTokens = adjacentTokens;

        return adjacentTokens;
    }

    /**
     * Gets Token Value for Node, if any.
     * The token value represents concatenated consecutive digits,
     * if any of those nodes are adjacent to a token marker.
     * @returns {NumberLike|null}
     */
    getSchematicTokenValue() {
        if (this.#left?.isDigit()) {
            return null;
        }
        const rightNodes = this.#getRightNodes(this, []);
        const isAdjacentSymbol = rightNodes.some(node => node.isAdjacentSymbol());

        if (isAdjacentSymbol) {
            return rightNodes.map(node => node.value).join('');
        }
        return null;
    }

    getRawTokenValue() {
        if (!this.isDigit()) {
            return null;
        }
        const leftNodes = this.#getLeftNodes(this.#left, []);
        const rightNodes = this.#getRightNodes(this, []);

        return leftNodes
            .concat(rightNodes)
            .map(node => node.value)
            .join('');
    }

    /**
     * Recursively Get Right Nodes to Compose a Token Value
     * @param {DataNode | null} node
     * @param {DataNode[]} rightNodes
     * @returns {DataNode[]} Array of Nodes to the Right
     */
    #getRightNodes(node, rightNodes = []) {
        if (node == null || !node.isDigit()) {
            return rightNodes;
        }
        return this.#getRightNodes(node.right, [...rightNodes, node]);
    }

    /**
     * Recursively Get Left Nodes to Compose a Token Value
     * @param {DataNode | null} node
     * @param {DataNode[]} leftNodes
     * @returns {DataNode[]} Array of Nodes to the Right
     */
    #getLeftNodes(node, leftNodes = []) {
        if (node == null || !node.isDigit()) {
            return leftNodes;
        }
        return this.#getLeftNodes(node.left, [node, ...leftNodes]);
    }
}

module.exports.DataNode = DataNode;
