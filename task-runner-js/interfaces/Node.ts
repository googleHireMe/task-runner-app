export abstract class Node<T> {
	constructor(
		public value: T,
		public parent: Node<T> = null,
		public children: Node<T>[] = null
	) {	}

	execute: () => Promise<void> | undefined;
 
}