module.exports = class Node {
	constructor(value, parent = null, children = null) {
		this.value = { ...value };
		this.parent = parent;
		this.children = children;
	}
}