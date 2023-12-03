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

    /**
     * Constructs new DataNode
     * @param {string} value
     */
    constructor(value) {
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

    isDigit() {
        return /[0-9]/.test(this.#value);
    }

    isAdjacentSymbol() {
        // check if token top
        if (this.#top?.isSymbol()) {
            return true;
        }
        // check if token bottom
        if (this.#bottom?.isSymbol()) {
            return true;
        }
        // check if token right
        if (this.#right?.isSymbol()) {
            return true;
        }
        // check if token left
        if (this.#left?.isSymbol()) {
            return true;
        }
        // check if token bottom left
        if (this.#bottom?.left?.isSymbol()) {
            return true;
        }
        // check if token bottom right
        if (this.#bottom?.right?.isSymbol()) {
            return true;
        }
        // check if token top left
        if (this.#top?.left?.isSymbol()) {
            return true;
        }
        // check if token top right
        if (this.#top?.right?.isSymbol()) {
            return true;
        }
    }

    /**
     * Gets Token Value for Node, if any.
     * The token value represents concatenated consecutive digits,
     * if any of those nodes are adjacent to a token marker.
     * @returns {NumberLike|null}
     */
    getTokenValue() {
        if (this.#left?.isDigit()) {
            return null;
        }
        const rightNodes = this.#getRightNodes(this, []);
        const isAdjacentToken = rightNodes.some(node => node.isAdjacentSymbol());

        if (isAdjacentToken) {
            return rightNodes.map(node => node.value).join('');
        }
        return null;
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
}

module.exports.DataNode = DataNode;
