import { Task } from './IConfig';
import { Node }  from './Node';

export abstract class Tree {
	private root: Node<Task>;

	constructor(
		task: Task,
		availableTasksList: Task[]
	) { }

	executeRootCommand(): Promise<void> {
		return new Promise((resolve, reject) => resolve());
	}

	preparePipeForTaskExecution(siblingNodes: Node<Task>[] = this.collectEndNodes()): void {}

	private convertCommandToFunction(node: Node<Task>): () => Promise<void> {
		return () => new Promise((resolve, reject) => resolve());
	}

	private initializeTree(currentNode: Node<Task>, tasksList: Task[]): void {}

	private collectEndNodes(currentNode: Node<Task> = this.root, accomulatorArray: Task[] = []): Node<Task>[] {
		return [];
	}
}