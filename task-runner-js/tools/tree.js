const runConsoleCommand = require('../commands/run-console-command');
const { isConsoleCommand } = require('../tools/tools');
const Node = require('./node');

module.exports = class Tree {
	constructor(task, availableTasksList, settings) {
		this.root = new Node(task);
		this.initializeTree(this.root, availableTasksList);
		this.preparePipeForTaskExecution();
		this.settings = settings;
	}

	async executeRootCommand() {
		return await this.root.execute();
	}

	preparePipeForTaskExecution(siblingNodes = this.collectEndNodes()) {
		const parentNodes = siblingNodes.map(node => {
			node.execute = this.convertCommandToFunction(node);
			return node.parent;
		});
		if (parentNodes.length === 1 && parentNodes[0] === null) { return; }
		this.preparePipeForTaskExecution([...new Set(parentNodes)]);
	}

	//private
	convertCommandToFunction(node) {
		const commandConfiguration = node.value;
		if (isConsoleCommand(node.value)) {
			return async () => await runConsoleCommand(
				commandConfiguration.path,
				commandConfiguration,
				this?.settings?.handleOutputMessage,
				this?.settings?.handleOutputError
			);
		}
		if (commandConfiguration.shouldRunCommandsInParallel === true) {
			return async () => await Promise.all(node.children.map(childNode => childNode.execute()));
		}
		return async () => node.children
			.map(childNode => childNode.execute)
			.reduce(async (accumulatorPromise, executeFunction) => {
				return accumulatorPromise.then(() => executeFunction()).catch(() => { console.log('Error') });
			}, Promise.resolve());
	}

	//private
	initializeTree(currentNode, tasksList) {
		if (isConsoleCommand(currentNode.value)) { return; }
		currentNode.children = currentNode.value.commands
			.map(subtask => {
				if (isConsoleCommand(subtask)) {
					return new Node(subtask, currentNode);
				}
				const subtaskFullDescription = tasksList.find(task => task.name === subtask.name);

				return new Node(subtaskFullDescription, currentNode);
			})
			.map(childNode => {
				if (currentNode.value.path) { childNode.value.path = currentNode.value.path; }
				return childNode;
			});
		currentNode.children.forEach(childNode => this.initializeTree(childNode, tasksList));
	}

	//private
	collectEndNodes(currentNode = this.root, accomulatorArray = []) {
		if (!currentNode.children) {
			accomulatorArray.push(currentNode);
			return;
		}
		currentNode.children.forEach(childNode => this.collectEndNodes(childNode, accomulatorArray));
		return accomulatorArray;
	}
}

