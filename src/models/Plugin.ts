import { TreeItem, Command, TreeItemCollapsibleState } from 'vscode';

export default class Plugin extends TreeItem {
	constructor(
		public label: string,
		public command?: Command,
		public children?: Plugin[]
	) {
		super(
			label,
			children === undefined
				? TreeItemCollapsibleState.None
				: TreeItemCollapsibleState.Collapsed
		);
		this.label = label;
		this.children = children;
		this.command = command;
	}
}
